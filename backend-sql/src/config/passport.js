const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("..//module/user");
const { v4: uuidv4 } = require("uuid");
const { newToken } = require("..//util/token");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.URL}/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user;
        user = await User.findOne({
          where: {
            email: profile._json.email,
          },
        });
        if (!user) {
          user = await User.create({
            name: profile._json.name,
            email: profile._json.email,
            password: uuidv4(),
            verifya: true,
          });
        }
        const token=newToken(user)
        cb(null, {user,token});
      } catch (err) {
        throw new Error("internal error");
      }
    }
  )
);
module.exports = passport;
