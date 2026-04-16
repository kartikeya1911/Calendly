const { prisma } = require("../config/database");
const { DEFAULT_USER_ID } = require("../config/constants");
const { dayjs } = require("./timeService");

/**
 * List meetings for the admin - upcoming or past.
 */
async function listMeetings(type = "upcoming") {
  const now = new Date();

  const where = {
    hostId: DEFAULT_USER_ID,
    status: "BOOKED",
    ...(type === "upcoming"
      ? { startsAt: { gte: now } }
      : { startsAt: { lt: now } }),
  };

  return prisma.meeting.findMany({
    where,
    include: { eventType: true },
    orderBy: { startsAt: type === "upcoming" ? "asc" : "desc" },
  });
}

/**
 * Book a new meeting. Performs conflict check before inserting.
 * Returns the created meeting or throws on conflict.
 */
async function bookMeeting({ eventTypeId, hostId, startsAt, endsAt, inviteeName, inviteeEmail }) {
  // Double-booking check
  const conflict = await prisma.meeting.findFirst({
    where: {
      eventTypeId,
      status: "BOOKED",
      startsAt: { lt: endsAt },
      endsAt: { gt: startsAt },
    },
  });

  if (conflict) {
    const err = new Error("Time slot already booked");
    err.status = 409;
    throw err;
  }

  return prisma.meeting.create({
    data: {
      eventTypeId,
      hostId,
      inviteeName,
      inviteeEmail,
      startsAt,
      endsAt,
      status: "BOOKED",
    },
    include: {
      eventType: true,
      host: true,
    },
  });
}

/**
 * Cancel a meeting by ID.
 */
async function cancelMeeting(id) {
  return prisma.meeting.update({
    where: { id },
    data: { status: "CANCELED" },
  });
}

/**
 * Reschedule a meeting — cancel the old one and create a new one.
 */
async function rescheduleMeeting(id, { newStartsAt, newEndsAt }) {
  const existing = await prisma.meeting.findUnique({
    where: { id },
    include: { eventType: true },
  });

  if (!existing) {
    const err = new Error("Meeting not found");
    err.status = 404;
    throw err;
  }

  // Cancel the existing meeting
  await prisma.meeting.update({
    where: { id },
    data: { status: "CANCELED" },
  });

  // Book the new slot
  return bookMeeting({
    eventTypeId: existing.eventTypeId,
    hostId: existing.hostId,
    startsAt: newStartsAt,
    endsAt: newEndsAt,
    inviteeName: existing.inviteeName,
    inviteeEmail: existing.inviteeEmail,
  });
}

/**
 * Get booked meetings in a time range for conflict checking.
 */
async function getBookedInRange(eventTypeId, from, to) {
  return prisma.meeting.findMany({
    where: {
      eventTypeId,
      status: "BOOKED",
      startsAt: { gte: new Date(from) },
      endsAt: { lte: new Date(to) },
    },
    select: { startsAt: true, endsAt: true },
  });
}

module.exports = {
  listMeetings,
  bookMeeting,
  cancelMeeting,
  rescheduleMeeting,
  getBookedInRange,
};
