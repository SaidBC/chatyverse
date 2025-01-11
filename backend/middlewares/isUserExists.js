const asyncHandler = require("express-async-handler");
const prisma = require("../utils/prisma");
const NotFoundError = require("../utils/errors/NotFoundError");
const BadRequestError = require("../utils/errors/BadRequestError");

const isUserExists = asyncHandler(async function isUserExists(req, res, next) {
  const id = Number(req.params.userId);
  const { username } = req.body;
  if (username && typeof username !== "string")
    throw new BadRequestError("Invalid username input type");
  if (id && typeof id !== "number")
    throw new BadRequestError("Invalid user id input type");
  let user;
  if (id) user = await prisma.user.findUnique({ where: { id } });
  else if (typeof username === "string")
    user = await prisma.user.findUnique({ where: { username } });
  if (!user) throw new NotFoundError("User not found");
  req.user = user;
  next();
});

module.exports = isUserExists;
