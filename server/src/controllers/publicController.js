const eventTypeService = require("../services/eventTypeService");
const availabilityService = require("../services/availabilityService");
const meetingService = require("../services/meetingService");
const { dayjs, buildSlotsForDate } = require("../services/timeService");
const { BUFFER_MINUTES } = require("../config/constants");

/**
 * GET /api/public/:slug
 * Returns event type info for the booking page.
 */
async function getEventType(req, res, next) {
  try {
    const eventType = await eventTypeService.findBySlug(req.params.slug);

    if (!eventType || !eventType.isActive) {
      return res.status(404).json({ error: "Event type not found" });
    }

    res.json({
      id: eventType.id,
      name: eventType.name,
      slug: eventType.slug,
      durationMinutes: eventType.durationMinutes,
      hostName: eventType.user.name,
      timezone: eventType.user.timezone,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/public/:slug/slots?date=YYYY-MM-DD
 * Generates available time slots for a specific date.
 * Algorithm:
 *   1. Find availability rules for the day of week
 *   2. Generate all possible slots from rules
 *   3. Subtract already booked meetings
 *   4. Subtract Google Calendar busy times (if connected)
 */
async function getSlots(req, res, next) {
  try {
    const date = req.query.date;
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "date query param is required (YYYY-MM-DD)" });
    }

    const eventType = await eventTypeService.findBySlug(req.params.slug);
    if (!eventType || !eventType.isActive) {
      return res.status(404).json({ error: "Event type not found" });
    }

    const userTz = eventType.user.timezone;
    const requestedDay = dayjs.tz(date, userTz).day();

    const rules = await availabilityService.getRulesForDay(eventType.userId, requestedDay);
    if (!rules.length) {
      return res.json({ slots: [] });
    }

    // Generate all possible slots from availability rules
    const slotBlocks = rules.flatMap((rule) =>
      buildSlotsForDate({
        date,
        timezoneName: userTz,
        startTime: rule.startTime,
        endTime: rule.endTime,
        durationMinutes: eventType.durationMinutes,
        bufferMinutes: BUFFER_MINUTES,
      })
    );

    if (!slotBlocks.length) {
      return res.json({ slots: [] });
    }

    const minStart = slotBlocks[0]?.startsAt;
    const maxEnd = slotBlocks[slotBlocks.length - 1]?.endsAt;

    // Subtract booked meetings
    const booked = await meetingService.getBookedInRange(eventType.id, minStart, maxEnd);

    const availableSlots = slotBlocks.filter((slot) => {
      const slotStart = new Date(slot.startsAt).getTime();
      const slotEnd = new Date(slot.endsAt).getTime();

      return !booked.some((meeting) => {
        const meetingStart = new Date(meeting.startsAt).getTime();
        const meetingEnd = new Date(meeting.endsAt).getTime();
        return slotStart < meetingEnd && meetingStart < slotEnd;
      });
    });

    // Optional: subtract Google Calendar busy times
    if (eventType.user.googleCalendarConnected) {
      try {
        const { fetchGoogleBusySlots } = require("../services/googleService");
        const busySlots = await fetchGoogleBusySlots(eventType.user, minStart, maxEnd);
        const busyRanges = busySlots.map((block) => ({
          start: new Date(block.startsAt).getTime(),
          end: new Date(block.endsAt).getTime(),
        }));

        const calendarAvailable = availableSlots.filter((slot) => {
          const slotStart = new Date(slot.startsAt).getTime();
          const slotEnd = new Date(slot.endsAt).getTime();
          return !busyRanges.some(
            (busy) => slotStart < busy.end && busy.start < slotEnd
          );
        });

        return res.json({ slots: calendarAvailable });
      } catch (error) {
        console.error("Google calendar fetch failed:", error.message);
      }
    }

    return res.json({ slots: availableSlots });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/public/:slug/book
 * Books a meeting slot. Validates the slot and prevents double booking.
 */
async function book(req, res, next) {
  try {
    const eventType = await eventTypeService.findBySlug(req.params.slug);
    if (!eventType || !eventType.isActive) {
      return res.status(404).json({ error: "Event type not found" });
    }

    const startsAt = dayjs(req.validated.startsAt);
    const endsAt = startsAt.add(eventType.durationMinutes, "minute");

    const meeting = await meetingService.bookMeeting({
      eventTypeId: eventType.id,
      hostId: eventType.userId,
      startsAt: startsAt.toDate(),
      endsAt: endsAt.toDate(),
      inviteeName: req.validated.name,
      inviteeEmail: req.validated.email,
    });

    res.status(201).json(meeting);
  } catch (err) {
    next(err);
  }
}

module.exports = { getEventType, getSlots, book };
