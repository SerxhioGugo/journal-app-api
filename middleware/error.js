const ErrorResponse = require('../utils/errorResponse');

//Creating an error middleware that will help us get a custom json response in case of error
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //Log to console for dev
  console.log(err.stack.red);

  //Mongoose bad ObjectID
  if (err.name == 'CastError') {
    const message = `Post not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
