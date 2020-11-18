class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode || 500);
  res.json({
    status: 'error',
    message,
  });
};

const logError = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

module.exports = {
  ErrorHandler,
  handleError,
  logError,
};
