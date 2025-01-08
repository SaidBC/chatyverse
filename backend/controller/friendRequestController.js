const BadRequestError = require("../utils/errors/BadRequestError");
const NotFoundError = require("../utils/errors/NotFoundError");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const prisma = require("../utils/prisma");
const asyncHandler = require("express-async-handler");

const sendFriendRequest = asyncHandler(async function (req, res) {
  const { receiverId } = req.params;
  if (receiverId == req.user.id)
    throw new BadRequestError("Cannot send friend request to your self");
  const friend = await prisma.user.findUnique({
    where: { id: Number(receiverId) },
  });
  if (!friend) throw new NotFoundError("Friend not found");
  const data = {};
  data.senderId = Number(req.user.id);
  data.receiverId = Number(receiverId);
  const isAlreadyRequest = await prisma.friendRequest.findFirst({
    where: {
      senderId: data.senderId,
      receiverId: data.receiverId,
    },
  });
  if (isAlreadyRequest && isAlreadyRequest.status === "REQUETED")
    throw new BadRequestError("Friend request already sent");

  const isAlreadyReceivedRequest = await prisma.friendRequest.findFirst({
    where: {
      senderId: data.receiverId,
      receiverId: data.senderId,
      status: "REQUETED",
    },
  });
  if (isAlreadyReceivedRequest)
    throw new BadRequestError("Your Friend already sent you request");
  await prisma.friendRequest.upsert({
    where: { id: isAlreadyRequest?.id || "A random unique" },
    update: { ...data, status: "REQUETED" },
    create: data,
  });
  res.json({ success: true, data: "Friend request was sent" });
});

const userFriendRequests = asyncHandler(async function (req, res) {
  const where = {};
  where.receiverId = req.user.id;
  where.status = "REQUETED";
  const { senderId, status } = req.query;
  status && (where.status = status);
  senderId && (where.senderId = Number(senderId));
  const requests = await prisma.friendRequest.findMany({ where });
  res.json({ success: true, data: requests });
});

const acceptFriendRequest = asyncHandler(async function (req, res) {
  const { senderId, receiverId } = req.params;
  if (receiverId != req.user.id)
    throw new UnauthorizedError("Cannot accept other people friend requests");
  const request = await prisma.friendRequest.findFirst({
    where: {
      senderId: Number(senderId),
      receiverId: Number(receiverId),
      status: "REQUETED",
    },
  });
  if (!request) throw new NotFoundError("Friend request not found");
  if (request.status === "ACCEPTED")
    throw new BadRequestError("Friend request already accepted");
  await prisma.friendRequest.update({
    where: {
      id: request.id,
    },
    data: {
      status: "ACCEPTED",
    },
  });
  await prisma.user.update({
    where: {
      id: Number(senderId),
    },
    data: {
      friends: {
        connect: { id: Number(receiverId) },
      },
    },
  });
  await prisma.user.update({
    where: {
      id: Number(receiverId),
    },
    data: {
      friends: {
        connect: { id: Number(senderId) },
      },
    },
  });
  res.json({ success: true, data: "Friend request accepted" });
});

const declineFriendRequest = asyncHandler(async function (req, res) {
  const { senderId, receiverId } = req.params;
  if (receiverId != req.user.id)
    throw new UnauthorizedError("Cannot decline other people friend requests");
  const request = await prisma.friendRequest.findFirst({
    where: {
      senderId: Number(senderId),
      receiverId: Number(receiverId),
      status: "REQUETED",
    },
  });
  if (!request) throw new NotFoundError("Friend request not found");
  if (request.status === "DECLINED")
    throw new BadRequestError("Friend request already declined");
  await prisma.friendRequest.update({
    where: {
      id: request.id,
    },
    data: {
      status: "DECLINED",
    },
  });
  res.json({ success: true, data: "Friend request declined" });
});

const userSentFriendRequests = asyncHandler(async function (req, res) {
  const where = {};
  where.senderId = req.user.id;
  where.status = "REQUETED";
  const { receiverId, status } = req.query;
  status && (where.status = status);
  receiverId && (where.receiverId = Number(receiverId));
  const requests = await prisma.friendRequest.findMany({ where });
  res.json({ success: true, data: requests });
});

const cancelFriendRequest = asyncHandler(async function (req, res) {
  const { senderId, receiverId } = req.params;
  if (senderId != req.user.id)
    throw new UnauthorizedError("Cannot cancel other people friend requests");
  const request = await prisma.friendRequest.findFirst({
    where: {
      senderId: Number(senderId),
      receiverId: Number(receiverId),
      status: "REQUETED",
    },
  });
  if (!request) throw new NotFoundError("Friend request not found");
  if (request.status === "CANCELED")
    throw new BadRequestError("Friend request already canceled");
  await prisma.friendRequest.update({
    where: {
      id: request.id,
    },
    data: {
      status: "CANCELED",
    },
  });
  res.json({ success: true, data: "Friend request canceled" });
});
module.exports = {
  sendFriendRequest,
  userFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  userSentFriendRequests,
  cancelFriendRequest,
};
