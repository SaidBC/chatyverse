const passport = require("../passport_configs/passport");
const skipRoutes = require("../utils/skipRoutes");
const BadRequestError = require("../utils/errors/BadRequestError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

const auth = function (req, res, next) {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) return next(new BadRequestError(err.message));
    if (!user) return next(new UnauthorizedError(info.message));
    req.user = user;
    const endPoints = [
      ["requests", "POST"],
      ["requests/:senderId/accept", "POST"],
      ["requests/:senderId/decline", "POST"],
      ["requests/:senderId/cancel", "POST"],
    ];
    if (skipRoutes(req, endPoints)) return next();
    const { userId, receiverId, senderId } = req.params;
    if (
      (userId && userId != user.id) ||
      (receiverId && receiverId != user.id) ||
      (senderId && senderId != user.id)
    )
      return next(
        new UnauthorizedError("Cannot access to other user profiles")
      );

    return next();
  })(req, res, next);
};

module.exports = auth;
