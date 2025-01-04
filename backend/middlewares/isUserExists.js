const asyncHandler = require("express-async-handler");
const prisma = require("../utils/prisma");
const NotFoundError = require("../utils/errors/NotFoundError");

const isUserExists = asyncHandler(async function isUserExists(req, res, next) {
  const id = Number(req.params.userId);
  const { username } = req.body;
  let user;
  if (id) user = await prisma.user.findUnique({ where: { id } });
  else if (username)
    user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new NotFoundError("User not found");
  req.user = user;
  next();
});

module.exports = isUserExists;
