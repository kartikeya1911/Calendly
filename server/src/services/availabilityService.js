const { prisma } = require("../config/database");
const { DEFAULT_USER_ID } = require("../config/constants");

/**
 * Get current user availability rules + timezone.
 */
async function getAvailability() {
  const user = await prisma.user.findUnique({
    where: { id: DEFAULT_USER_ID },
    include: {
      availability: {
        orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
      },
    },
  });

  return {
    timezone: user?.timezone ?? "UTC",
    rules: user?.availability ?? [],
  };
}

/**
 * Replace all availability rules for the default user.
 */
async function updateAvailability({ timezone, rules }) {
  return prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: DEFAULT_USER_ID },
      data: { timezone },
    });

    await tx.availabilityRule.deleteMany({ where: { userId: DEFAULT_USER_ID } });

    if (rules.length) {
      await tx.availabilityRule.createMany({
        data: rules.map((rule) => ({
          userId: DEFAULT_USER_ID,
          dayOfWeek: rule.dayOfWeek,
          startTime: rule.startTime,
          endTime: rule.endTime,
        })),
      });
    }
  });
}

/**
 * Get availability rules for a specific user + day of week.
 */
async function getRulesForDay(userId, dayOfWeek) {
  return prisma.availabilityRule.findMany({
    where: { userId, dayOfWeek },
    orderBy: { startTime: "asc" },
  });
}

module.exports = {
  getAvailability,
  updateAvailability,
  getRulesForDay,
};
