const availabilityService = require("../services/availabilityService");

async function get(req, res, next) {
  try {
    const data = await availabilityService.getAvailability();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    await availabilityService.updateAvailability(req.validated);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { get, update };
