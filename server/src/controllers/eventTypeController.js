const eventTypeService = require("../services/eventTypeService");

async function list(req, res, next) {
  try {
    const eventTypes = await eventTypeService.listEventTypes();
    res.json(eventTypes);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const eventType = await eventTypeService.createEventType(req.validated);
    res.status(201).json(eventType);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Slug already exists" });
    }
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const eventType = await eventTypeService.updateEventType(id, req.validated);
    res.json(eventType);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    await eventTypeService.deleteEventType(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, create, update, remove };
