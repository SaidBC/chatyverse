const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  userAllFriends,
  uploadUserPicture,
} = require("../controller/userController");
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHanldler");
const isUserExists = require("../middlewares/isUserExists");
const validatorErrorHandler = require("../middlewares/validatorErrorHandler");
const {
  addUserValidator,
  updateUserValidator,
} = require("../middlewares/validators/userValidators");
const fs = require("fs");
const Multer = require("multer");
if (fs.existsSync("./uploads") === false) fs.mkdirSync("./uploads");
const storage = new Multer.memoryStorage();
const upload = Multer(storage);
const userRouter = require("express").Router();

userRouter
  .route("/users")
  .get(getAllUsers)
  .post(addUserValidator, validatorErrorHandler, createUser);

userRouter
  .route("/users/:userId")
  .get(isUserExists, getUser)
  .delete(isUserExists, auth, deleteUser)
  .patch(
    isUserExists,
    auth,
    updateUserValidator,
    validatorErrorHandler,
    updateUser
  );
userRouter.post(
  "/users/:userId/upload",
  isUserExists,
  auth,
  upload.single("avatar"),
  uploadUserPicture
);

userRouter.get("/users/:userId/friends", userAllFriends);

userRouter.use(errorHandler);

module.exports = userRouter;
