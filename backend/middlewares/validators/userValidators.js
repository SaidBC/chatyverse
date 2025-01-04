const { body, checkExact } = require("express-validator");
const prisma = require("../../utils/prisma");
const { Prisma } = require("@prisma/client");
const bcrypt = require("bcrypt");
const updateSantizier = require("./updateSantiziers");

const addUserValidator = [
  function (req, res, next) {
    const { username, email, password } = req.body;
    delete req.body;
    req.body = { username, email, password };
    next();
  },
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username must not be empty")
    .custom(async function (val) {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await prisma.user.findUnique({
            where: { username: val },
          });
          if (user) return reject("Username already exists");
          resolve();
        } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError)
            return resolve();
          return reject("Something wrong");
        }
      });
    }),
  body("email")
    .isString()
    .withMessage("Email must be a string")
    .notEmpty()
    .withMessage("Email mustnt be empty")
    .isEmail()
    .withMessage("Invalid email try again")
    .custom(async function (val) {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: val },
          });
          if (user) return reject("Email already exists");
          resolve();
        } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError)
            return resolve();
          return reject("Something wrong");
        }
      });
    }),
  body("password")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 characters"),
  checkExact(),
];

const updateUserValidator = [
  updateSantizier,
  body("username")
    .optional()
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username must not be empty")
    .custom(async function (val) {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await prisma.user.findUnique({
            where: { username: val },
          });
          if (user) return reject("Username already exists");
          resolve();
        } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError)
            return resolve();
          return reject(error.message);
        }
      });
    }),
  body("email")
    .optional()
    .custom((val, { req }) => val === req.user.email)
    .withMessage("Please enter your old email"),
  body("new-email")
    .optional()
    .custom((_, { req }) => req.body.password)
    .withMessage("Password not provided")
    .custom((_, { req }) => req.body.email)
    .withMessage("Email not provided")
    .isString()
    .withMessage("Email must be a string")
    .notEmpty()
    .withMessage("Email mustnt be empty")
    .isEmail()
    .withMessage("Invalid email try again")
    .custom(async function (val) {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await prisma.user.findUnique({
            where: { email: val },
          });
          if (user) return reject("Email already exists");
          resolve();
        } catch (error) {
          if (error instanceof Prisma.PrismaClientValidationError)
            return resolve();
          return reject(error.message);
        }
      });
    }),

  body("password")
    .optional()
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 characters")
    .custom((val, { req }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const match = await bcrypt.compare(val, req.user.password);
          if (!match) return reject("Incorrect password try again");
          resolve();
        } catch (error) {
          return reject(error.message);
        }
      });
    }),
  body("new-password")
    .optional()
    .custom((_, { req }) => req.body.password)
    .withMessage("Password not provided")
    .isLength({ min: 4 })
    .withMessage("New password must be at least 4 characters"),
  body("birthday")
    .optional()
    .isDate()
    .withMessage("Birth day must be a valid date"),
  body("location")
    .optional()
    .notEmpty()
    .withMessage("Location must not be a empty")
    .isString()
    .withMessage("Location must be a string")
    .matches(/^(\w+,\w+)$/, "g")
    .withMessage("Write country + city separate them with ,"),
  body("bio")
    .optional()
    .notEmpty()
    .withMessage("Bio must not be a empty")
    .isString()
    .withMessage("Bio must be a string"),
  function (req, res, next) {
    delete req.body.password;
    delete req.body.email;
    if (req.body["new-email"])
      (req.body.email = req.body["new-email"]), delete req.body["new-email"];
    if (req.body["new-password"])
      (req.body.password = req.body["new-password"]),
        delete req.body["new-password"];
    next();
  },
];

const loginValidator = [
  function (req, res, next) {
    const { username, password } = req.body;
    delete req.body;
    req.body = { username, password };
    next();
  },
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username must not be empty"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("password must be at least 4 characters")
    .custom(function (val, { req }) {
      return new Promise(async (resolve, reject) => {
        const match = await bcrypt.compare(val, req.user.password);
        if (!match) return reject("Incorrect password");
        return resolve();
      });
    }),
  checkExact(),
];
module.exports = { loginValidator, addUserValidator, updateUserValidator };
