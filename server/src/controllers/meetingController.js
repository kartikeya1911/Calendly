const meetingService = require("../services/meetingService");

async function list(req, res, next) {
  try {
    const type = req.query.type === "past" ? "past" : "upcoming";
    const meetings = await meetingService.listMeetings(type);
    res.json(meetings);
  } catch (err) {
    next(err);
  }
}

async function cancel(req, res, next) {
  try {
    const id = Number(req.params.id);
    const meeting = await meetingService.cancelMeeting(id);
    res.json(meeting);
  } catch (err) {
    next(err);
  }
}

async function reschedule(req, res, next) {
  try {
    const id = Number(req.params.id);
    const meeting = await meetingService.rescheduleMeeting(id, {
      newStartsAt: new Date(req.validated.startsAt),
      newEndsAt: new Date(req.validated.endsAt),
    });
    res.json(meeting);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, cancel, reschedule };
