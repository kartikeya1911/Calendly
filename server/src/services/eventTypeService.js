const { prisma } = require("../config/database");
const { DEFAULT_USER_ID } = require("../config/constants");

/**
 * Get all event types for the default admin user.
 */
async function listEventTypes() {
  return prisma.eventType.findMany({
    where: { userId: DEFAULT_USER_ID },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Create a new event type.
 */
async function createEventType(data) {
  return prisma.eventType.create({
    data: {
      ...data,
      userId: DEFAULT_USER_ID,
    },
  });
}

/**
 * Update an existing event type.
 */
async function updateEventType(id, data) {
  return prisma.eventType.update({
    where: { id },
    data,
  });
}

/**
 * Delete an event type and all associated meetings (cascade).
 */
async function deleteEventType(id) {
  return prisma.$transaction([
    prisma.meeting.deleteMany({ where: { eventTypeId: id } }),
    prisma.eventType.delete({ where: { id } }),
  ]);
}

/**
 * Find event type by slug (for public booking pages).
 */
async function findBySlug(slug) {
  return prisma.eventType.findUnique({
    where: { slug },
    include: { user: true },
  });
}

module.exports = {
  listEventTypes,
  createEventType,
  updateEventType,
  deleteEventType,
  findBySlug,
};
