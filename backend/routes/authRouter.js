const { signup, login } = require("../controller/authController");
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

authRouter.use(errorHandler);

module.exports = authRouter;
