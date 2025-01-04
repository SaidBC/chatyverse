const { pickBy } = require("lodash");
const updateSantizier = function (req, res, next) {
  if (req.body.newEmail)
    (req.body["new-email"] = req.body.newEmail), delete req.body.newEmail;
  if (req.body.newPassword)
    (req.body["new-password"] = req.body.newPassword),
      delete req.body.newPassword;
  const paths = [
    "bio",
    "new-password",
    "new-email",
    "password",
    "email",
    "birthday",
    "location",
    "username",
  ];
  const temp = req.body;
  delete req.body;
  req.body = {};
  for (const path of paths) {
    req.body[path] = temp[path];
  }
  req.body = pickBy(req.body, (o) => o !== undefined);
  next();
};

module.exports = updateSantizier;
