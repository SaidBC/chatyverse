// eslint-disable-next-line no-unused-vars
const errorHandler = function (err, req, res, next) {
  res
    .status(err.statusCode || 500)
    .json({ success: false, error: { ...err, message: err.message } });
};

module.exports = errorHandler;
