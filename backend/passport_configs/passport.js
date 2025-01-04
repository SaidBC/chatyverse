const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const prisma = require("../utils/prisma");

const opts = {};
opts.secretOrKey = process.env.JWT_SECRET || "secret";
opts.jwtFromRequest = new ExtractJwt.fromAuthHeaderAsBearerToken();

passport.use(
  new Strategy(opts, async function (payload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });
      if (!user) done(null, false, { message: "User not found" });
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

module.exports = passport;
