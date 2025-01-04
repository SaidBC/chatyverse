const asyncHandler = require("express-async-handler");
const prisma = require("../utils/prisma");
const jwt = require("jsonwebtoken");
const generatePassword = require("../utils/generantePassword");

const login = asyncHandler(async function (req, res) {
  const { id, username } = req.user;
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET || "secret");
  res.json({ success: true, data: token });
});
const signup = asyncHandler(async function (req, res) {
  const data = req.body;
  data.password = await generatePassword(data.password);
  const user = await prisma.user.create({ data });
  const { id, username } = user;
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET || "secret");
  res.json({ success: true, data: token });
});

module.exports = {
  login,
  signup,
};
