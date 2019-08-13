const passport = require("passport");
const mongoose = require("mongoose");
const userModel = mongoose.model("User");

const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "api/auth/google/callback/",
    },
    (accessToken, refreshToken, profile, done) => {
      userModel.findOne({ googleId: profile.id }).then(existingUser => {
        // console.log(existingUser);
        if (existingUser) {
          done(null, existingUser);
        } else {
          // console.log("Profile:", profile);
          new userModel({ googleId: profile.id, email: profile.emails[0].value, name: profile.displayName })
            .save()
            .then(user => {
              done(null, user);
            });
        }
      });
    },
  ),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id).then(user => {
    done(null, user);
  });
});

module.exports = passport;
