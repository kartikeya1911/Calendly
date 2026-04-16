const { Router } = require("express");
const { google } = require("googleapis");
const { prisma } = require("../config/database");
const { DEFAULT_USER_ID } = require("../config/constants");
const { getAuthUrl, makeOAuthClient } = require("../services/googleService");

const router = Router();

router.get("/google/status", async (_req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: DEFAULT_USER_ID },
  });

  res.json({
    connected: Boolean(user?.googleCalendarConnected && user?.googleRefreshToken),
    email: user?.googleEmail || null,
  });
});

router.get("/auth/google", (_req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});

router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  if (!code || typeof code !== "string") {
    return res.status(400).send("Missing code");
  }

  try {
    const client = makeOAuthClient();
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const oauth2 = google.oauth2({ auth: client, version: "v2" });
    const profile = await oauth2.userinfo.get();
    const userInfo = profile.data;

    await prisma.user.update({
      where: { id: DEFAULT_USER_ID },
      data: {
        googleId: userInfo.id,
        googleEmail: userInfo.email,
        googleRefreshToken: tokens.refresh_token || undefined,
        googleAccessToken: tokens.access_token || undefined,
        googleAccessTokenExpiresAt: tokens.expiry_date
          ? new Date(tokens.expiry_date)
          : undefined,
        googleCalendarConnected: true,
      },
    });

    const redirectUrl = process.env.FRONTEND_URL || "https://calendly-sage.vercel.app";
    return res.redirect(`${redirectUrl}/connect-calendar?connected=true`);
  } catch (error) {
    console.error("Google auth callback error:", error?.message || error);
    return res.status(500).send(`Google auth failed: ${error?.message || "Unknown error"}`);
  }
});

module.exports = router;
