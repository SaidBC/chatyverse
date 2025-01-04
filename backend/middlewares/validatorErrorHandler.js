const { validationResult } = require("express-validator");

function validatorErrorHandler(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, error: errors });
  }
  next();
}
module.exports = validatorErrorHandler;
