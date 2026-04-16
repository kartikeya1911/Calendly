const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Builds an array of time slots for a given date, availability window, and duration.
 * All times are stored as UTC ISO strings.
 *
 * @param {Object} opts
 * @param {string} opts.date - YYYY-MM-DD in the host timezone
 * @param {string} opts.timezoneName - IANA timezone, e.g. "Asia/Kolkata"
 * @param {string} opts.startTime - HH:mm
 * @param {string} opts.endTime - HH:mm
 * @param {number} opts.durationMinutes - slot length in minutes
 * @param {number} [opts.bufferMinutes=0] - buffer between slots
 * @returns {{ startsAt: string, endsAt: string, label: string }[]}
 */
function buildSlotsForDate({ date, timezoneName, startTime, endTime, durationMinutes, bufferMinutes = 0 }) {
  const dayStart = dayjs.tz(`${date} ${startTime}`, "YYYY-MM-DD HH:mm", timezoneName);
  const dayEnd = dayjs.tz(`${date} ${endTime}`, "YYYY-MM-DD HH:mm", timezoneName);
  const slots = [];

  let cursor = dayStart;
  while (cursor.add(durationMinutes, "minute").valueOf() <= dayEnd.valueOf()) {
    const slotEnd = cursor.add(durationMinutes, "minute");

    // Don't generate slots in the past
    if (slotEnd.isAfter(dayjs())) {
      slots.push({
        startsAt: cursor.utc().toISOString(),
        endsAt: slotEnd.utc().toISOString(),
        label: cursor.tz(timezoneName).format("h:mm A"),
      });
    }

    cursor = cursor.add(durationMinutes + bufferMinutes, "minute");
  }

  return slots;
}

module.exports = {
  dayjs,
  buildSlotsForDate,
};
