const asyncHandler = require("express-async-handler");
const prisma = require("../utils/prisma");
const generatePassword = require("../utils/generantePassword");
const { handleUpload } = require("../utils/handleUpload");
const BadRequestError = require("../utils/errors/BadRequestError");

const getAllUsers = asyncHandler(async function (req, res) {
  const { username } = req.query;
  const { role } = req;
  const where = {};
  if (username) {
    where.username = {
      contains: username,
      mode: "insensitive",
    };
  }
  const select = {};
  if (role !== "ADMIN") {
    select.id = true;
    select.username = true;
    select.profilePicture = true;
    select.online = true;
  }
  const users = await prisma.user.findMany({ where, select });
  res.json({ success: true, data: users });
});

const getUser = asyncHandler(async function (req, res) {
  const { role } = req;
  const { email, password, ...other } = req.user;
  if (role === "ADMIN") return res.json({ success: true, data: req.user });
  res.json({ success: true, data: other });
});

const createUser = asyncHandler(async function (req, res) {
  const data = req.body;
  data.password = await generatePassword(data.password);
  const user = await prisma.user.create({ data });
  res.json({ success: true, data: user });
});

const deleteUser = asyncHandler(async function (req, res) {
  const user = await prisma.user.delete({ where: { id: req.user.id } });
  res.json({ success: true, data: user });
});

const updateUser = asyncHandler(async function (req, res) {
  const data = req.body;
  if (data["new-password"]) {
    data.password = await generatePassword(data["new-password"]);
  }
  delete data["new-password"];
  data.birthday &&= new Date(data.birthday);
  const user = await prisma.user.update({ data, where: { id: req.user.id } });
  res.json({ success: true, data: user });
});

const userAllFriends = asyncHandler(async function (req, res) {
  const userId = Number(req.params.userId);
  const where = {};
  const include = {};
  where.id = userId;
  include.friends = {
    select: {
      id: true,
      username: true,
      profilePicture: true,
    },
  };
  const { friendId } = req.query;
  if (friendId)
    include.friends.where = {
      id: Number(friendId),
    };
  const { friends } = await prisma.user.findFirst({ where, include });
  res.json({ success: true, data: friends });
});

const uploadUserPicture = asyncHandler(async (req, res) => {
  if (!req.file) return BadRequestError("No image provided");
  const { buffer, mimetype } = req.file;
  const b64 = Buffer.from(buffer).toString("base64");
  const dataUri = "data:" + mimetype + ";base64," + b64;
  const cldRes = await handleUpload(dataUri);
  const user = await prisma.user.update({
    where: { id: Number(req.params.userId) },
    data: {
      profilePicture: cldRes.url,
    },
  });
  res.json({ success: true, data: "Profile image upload was done" });
});

const connectUser = asyncHandler(async function (req, res) {
  const userId = Number(req.params.userId);
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      online: true,
    },
  });
  res.json({ success: true, data: "User is now online" });
});

const disconnectUser = asyncHandler(async function (req, res) {
  const userId = Number(req.params.userId);
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      online: false,
    },
  });
  res.json({ success: true, data: "User is now offline" });
});

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
  userAllFriends,
  uploadUserPicture,
  disconnectUser,
  connectUser,
};
