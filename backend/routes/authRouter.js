const {
  signup,
  login,
  refreshUserToken,
} = require("../controller/authController");
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHanldler");
const isUserExists = require("../middlewares/isUserExists");
const validatorErrorHandler = require("../middlewares/validatorErrorHandler");
const {
  addUserValidator,
  loginValidator,
} = require("../middlewares/validators/userValidators");

const authRouter = require("express").Router();

authRouter.post(
  "/auth/signup",
  addUserValidator,
  validatorErrorHandler,
  signup
);
authRouter.post(
  "/auth/login",
  isUserExists,
  loginValidator,
  validatorErrorHandler,
  login
);

authRouter.get("/auth/refreshToken", auth, refreshUserToken);

authRouter.get("/auth/protected", auth, (req, res) => {
  res.json({ success: true, data: "Hello There!", user: req.user });
});

authRouter.use(errorHandler);

module.exports = authRouter;
