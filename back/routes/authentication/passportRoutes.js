const passport = require("passport");

module.exports = app => {
  app.use(
    "/api/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    }),
  );

  app.use("/api/auth/google/callback", passport.authenticate("google"), (req, res) => {
    res.send("Hello");
  });

  app.use("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.use("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
