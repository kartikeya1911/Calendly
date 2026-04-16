const { google } = require("googleapis");
const { prisma } = require("../config/database");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI =
  process.env.GOOGLE_REDIRECT_URI || "http://localhost:4000/api/auth/google/callback";

function makeOAuthClient() {
  return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
}

function getAuthUrl() {
  const client = makeOAuthClient();
  return client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "openid",
      "profile",
      "email",
      // Read-only: check busy slots for availability
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar.events.readonly",
      // Write: create events when a meeting is booked
      "https://www.googleapis.com/auth/calendar.events",
    ],
  });
}

async function getUserOAuthClient(user) {
  const client = makeOAuthClient();
  client.setCredentials({
    access_token: user.googleAccessToken || undefined,
    refresh_token: user.googleRefreshToken || undefined,
    expiry_date: user.googleAccessTokenExpiresAt
      ? user.googleAccessTokenExpiresAt.getTime()
      : undefined,
  });

  // Auto-persist refreshed tokens
  client.on("tokens", async (tokens) => {
    const updateData = {};
    if (tokens.refresh_token) updateData.googleRefreshToken = tokens.refresh_token;
    if (tokens.access_token) updateData.googleAccessToken = tokens.access_token;
    if (tokens.expiry_date)
      updateData.googleAccessTokenExpiresAt = new Date(tokens.expiry_date);

    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({ where: { id: user.id }, data: updateData });
    }
  });

  return client;
}

/**
 * Fetch busy time blocks from Google Calendar (freebusy query).
 */
async function fetchGoogleBusySlots(user, from, to) {
  if (!user.googleCalendarConnected || !user.googleRefreshToken) {
    return [];
  }

  const auth = await getUserOAuthClient(user);
  const calendar = google.calendar({ version: "v3", auth });

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: from,
      timeMax: to,
      timeZone: user.timezone,
      items: [{ id: "primary" }],
    },
  });

  const busy = response.data.calendars?.primary?.busy ?? [];
  return busy.map((block) => ({
    startsAt: block.start,
    endsAt: block.end,
  }));
}

/**
 * Create a Google Calendar event for a booked meeting.
 * Returns the created event ID, or null if calendar is not connected.
 */
async function createCalendarEvent(user, { summary, description, startsAt, endsAt, attendeeEmail, attendeeName }) {
  if (!user.googleCalendarConnected || !user.googleRefreshToken) {
    return null;
  }

  try {
    const auth = await getUserOAuthClient(user);
    const calendar = google.calendar({ version: "v3", auth });

    const event = await calendar.events.insert({
      calendarId: "primary",
      sendUpdates: "all", // sends email invitations to attendees
      requestBody: {
        summary,
        description,
        start: {
          dateTime: new Date(startsAt).toISOString(),
          timeZone: user.timezone,
        },
        end: {
          dateTime: new Date(endsAt).toISOString(),
          timeZone: user.timezone,
        },
        attendees: [
          { email: user.googleEmail, displayName: user.name },
          { email: attendeeEmail, displayName: attendeeName },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 },
            { method: "popup", minutes: 10 },
          ],
        },
      },
    });

    return event.data.id || null;
  } catch (err) {
    console.error("Failed to create Google Calendar event:", err.message);
    return null;
  }
}

/**
 * Delete a Google Calendar event by its event ID.
 */
async function deleteCalendarEvent(user, googleEventId) {
  if (!user.googleCalendarConnected || !user.googleRefreshToken || !googleEventId) {
    return;
  }

  try {
    const auth = await getUserOAuthClient(user);
    const calendar = google.calendar({ version: "v3", auth });
    await calendar.events.delete({
      calendarId: "primary",
      eventId: googleEventId,
      sendUpdates: "all",
    });
  } catch (err) {
    // Don't throw — event may already be deleted
    console.error("Failed to delete Google Calendar event:", err.message);
  }
}

module.exports = {
  getAuthUrl,
  makeOAuthClient,
  getUserOAuthClient,
  fetchGoogleBusySlots,
  createCalendarEvent,
  deleteCalendarEvent,
};

