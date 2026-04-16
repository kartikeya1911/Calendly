require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  // ── User ──
  const user = await prisma.user.upsert({
    where: { email: "owner@calendlyclone.dev" },
    update: {
      name: "Rahul Jain",
      timezone: "Asia/Kolkata",
    },
    create: {
      name: "Rahul Jain",
      email: "owner@calendlyclone.dev",
      timezone: "Asia/Kolkata",
    },
  });
  console.log("  ✓ User created:", user.name);

  // ── Event Types ──
  const introCall = await prisma.eventType.upsert({
    where: { slug: "intro-call" },
    update: {
      name: "Intro Call",
      durationMinutes: 30,
      userId: user.id,
      isActive: true,
    },
    create: {
      userId: user.id,
      name: "Intro Call",
      durationMinutes: 30,
      slug: "intro-call",
      isActive: true,
    },
  });

  const productDemo = await prisma.eventType.upsert({
    where: { slug: "product-demo" },
    update: {
      name: "Product Demo",
      durationMinutes: 45,
      userId: user.id,
      isActive: true,
    },
    create: {
      userId: user.id,
      name: "Product Demo",
      durationMinutes: 45,
      slug: "product-demo",
      isActive: true,
    },
  });

  await prisma.eventType.upsert({
    where: { slug: "quick-chat" },
    update: {
      name: "Quick Chat",
      durationMinutes: 15,
      userId: user.id,
      isActive: true,
    },
    create: {
      userId: user.id,
      name: "Quick Chat",
      durationMinutes: 15,
      slug: "quick-chat",
      isActive: true,
    },
  });

  console.log("  ✓ Event types created: Intro Call, Product Demo, Quick Chat");

  // ── Availability (Mon-Fri 9AM-5PM, Fri till 4PM) ──
  await prisma.availabilityRule.deleteMany({ where: { userId: user.id } });
  await prisma.availabilityRule.createMany({
    data: [
      { userId: user.id, dayOfWeek: 1, startTime: "09:00", endTime: "17:00" },
      { userId: user.id, dayOfWeek: 2, startTime: "09:00", endTime: "17:00" },
      { userId: user.id, dayOfWeek: 3, startTime: "09:00", endTime: "17:00" },
      { userId: user.id, dayOfWeek: 4, startTime: "09:00", endTime: "17:00" },
      { userId: user.id, dayOfWeek: 5, startTime: "09:00", endTime: "16:00" },
    ],
  });
  console.log("  ✓ Availability set: Mon-Fri 9AM-5PM (Fri till 4PM)");

  // ── Sample Meetings ──
  await prisma.meeting.deleteMany({ where: { hostId: user.id } });

  const upcomingStart1 = dayjs().add(2, "day").hour(11).minute(0).second(0).millisecond(0);
  const upcomingStart2 = dayjs().add(4, "day").hour(14).minute(30).second(0).millisecond(0);
  const pastStart1 = dayjs().subtract(3, "day").hour(15).minute(0).second(0).millisecond(0);
  const pastStart2 = dayjs().subtract(7, "day").hour(10).minute(0).second(0).millisecond(0);

  await prisma.meeting.createMany({
    data: [
      {
        eventTypeId: introCall.id,
        hostId: user.id,
        inviteeName: "Aman Gupta",
        inviteeEmail: "aman@example.com",
        startsAt: upcomingStart1.toDate(),
        endsAt: upcomingStart1.add(30, "minute").toDate(),
        status: "BOOKED",
      },
      {
        eventTypeId: productDemo.id,
        hostId: user.id,
        inviteeName: "Priya Mehta",
        inviteeEmail: "priya@example.com",
        startsAt: upcomingStart2.toDate(),
        endsAt: upcomingStart2.add(45, "minute").toDate(),
        status: "BOOKED",
      },
      {
        eventTypeId: introCall.id,
        hostId: user.id,
        inviteeName: "Neha Sharma",
        inviteeEmail: "neha@example.com",
        startsAt: pastStart1.toDate(),
        endsAt: pastStart1.add(30, "minute").toDate(),
        status: "BOOKED",
      },
      {
        eventTypeId: introCall.id,
        hostId: user.id,
        inviteeName: "Vikram Singh",
        inviteeEmail: "vikram@example.com",
        startsAt: pastStart2.toDate(),
        endsAt: pastStart2.add(30, "minute").toDate(),
        status: "BOOKED",
      },
    ],
    skipDuplicates: true,
  });
  console.log("  ✓ Sample meetings created: 2 upcoming, 2 past");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n✅ Seed complete!\n");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
