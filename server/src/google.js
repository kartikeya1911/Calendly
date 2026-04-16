const { google } = require("googleapis");
const { prisma } = require("./db");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:4000/api/auth/google/callback";

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
      "https://www.googleapis.com/auth/calendar.events.readonly",
      "https://www.googleapis.com/auth/calendar.readonly",
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

  client.on("tokens", async (tokens) => {
    const updateData = {};
    if (tokens.refresh_token) {
      updateData.googleRefreshToken = tokens.refresh_token;
    }
    if (tokens.access_token) {
      updateData.googleAccessToken = tokens.access_token;
    }
    if (tokens.expiry_date) {
      updateData.googleAccessTokenExpiresAt = new Date(tokens.expiry_date);
    }
    if (Object.keys(updateData).length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });
    }
  });

  return client;
}

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

module.exports = {
  getAuthUrl,
  getUserOAuthClient,
  fetchGoogleBusySlots,
  makeOAuthClient,
};
