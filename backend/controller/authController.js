const asyncHandler = require("express-async-handler");
const prisma = require("../utils/prisma");
const jwt = require("jsonwebtoken");
const generatePassword = require("../utils/generantePassword");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const login = asyncHandler(async function (req, res) {
  const { id, username } = req.user;
  const refreshToken = jwt.sign({ id, username }, JWT_SECRET);
  const accessToken = jwt.sign({ id, username }, JWT_SECRET, {
    expiresIn: "15m",
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 10000000,
    httpOnly: true,
  });
  res.json({ success: true, data: accessToken });
});

const signup = asyncHandler(async function (req, res) {
  const data = req.body;
  data.password = await generatePassword(data.password);
  const user = await prisma.user.create({ data });
  const { id, username } = user;
  const refreshToken = jwt.sign({ id, username }, JWT_SECRET);
  const accessToken = jwt.sign({ id, username }, JWT_SECRET, {
    expiresIn: "15m",
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 10000000,
    httpOnly: true,
  });
  res.json({ success: true, data: accessToken });
});

const refreshUserToken = asyncHandler(function (req, res) {
  const { id, username } = req.user;
  const accessToken = jwt.sign({ id, username }, JWT_SECRET, {
    expiresIn: "15m",
  });
  res.json({ success: true, data: accessToken });
});

module.exports = {
  login,
  signup,
  refreshUserToken,
};
