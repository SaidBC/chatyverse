const asyncHandler = require("express-async-handler");
const prisma = require("../utils/prisma");
const generatePassword = require("../utils/generantePassword");

const getAllUsers = asyncHandler(async function (req, res) {
  const users = await prisma.user.findMany({});
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

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
  userAllFriends,
};
