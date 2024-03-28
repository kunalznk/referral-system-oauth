import { verifyGoogleToken } from "../utils/util";

require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const googleOauth = new GoogleStrategy(
  {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SEC,
    callbackURL: process.env.G_CB_URL,
  },
  async (accessToken, refreshToken, profile, done) => {

    try {
      verifyGoogleToken(accessToken, refreshToken, profile);
      done(null, {
        accessToken,
        refreshToken,
        profile,
      });
    } catch (error) {
      done(error, null);
    }
  },
);

export default googleOauth;
