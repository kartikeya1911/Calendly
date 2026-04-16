const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

dayjs.extend(utc);
dayjs.extend(timezone);

function parseTimeToMinutes(value) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

function buildSlotsForDate({ date, timezoneName, startTime, endTime, durationMinutes }) {
  const dayStart = dayjs.tz(`${date} ${startTime}`, "YYYY-MM-DD HH:mm", timezoneName);
  const dayEnd = dayjs.tz(`${date} ${endTime}`, "YYYY-MM-DD HH:mm", timezoneName);
  const slots = [];

  let cursor = dayStart;
  while (cursor.add(durationMinutes, "minute").valueOf() <= dayEnd.valueOf()) {
    const slotEnd = cursor.add(durationMinutes, "minute");
    slots.push({
      startsAt: cursor.utc().toISOString(),
      endsAt: slotEnd.utc().toISOString(),
      label: cursor.format("h:mm A"),
    });
    cursor = cursor.add(durationMinutes, "minute");
  }

  return slots;
}

module.exports = {
  dayjs,
  parseTimeToMinutes,
  buildSlotsForDate,
};
