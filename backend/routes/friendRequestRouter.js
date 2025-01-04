const {
  sendFriendRequest,
  userFriendRequests,
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  userSentFriendRequests,
} = require("../controller/friendRequestController");
const auth = require("../middlewares/auth");
const errorHandler = require("../middlewares/errorHanldler");

const friendRequestRouter = require("express").Router();

friendRequestRouter
  .route("/users/:receiverId/requests")
  .get(auth, userFriendRequests)
  .post(auth, sendFriendRequest);

friendRequestRouter.get(
  "/users/:senderId/requests/sent",
  auth,
  userSentFriendRequests
);

friendRequestRouter.post(
  "/users/:receiverId/requests/:senderId/accept",
  auth,
  acceptFriendRequest
);
friendRequestRouter.post(
  "/users/:receiverId/requests/:senderId/decline",
  auth,
  declineFriendRequest
);
friendRequestRouter.post(
  "/users/:receiverId/requests/:senderId/cancel",
  auth,
  cancelFriendRequest
);

friendRequestRouter.use(errorHandler);

module.exports = friendRequestRouter;
