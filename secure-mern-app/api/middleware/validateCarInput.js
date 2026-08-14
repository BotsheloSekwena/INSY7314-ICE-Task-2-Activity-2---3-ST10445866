// Input validation middleware using Joi
// NEW: This file was created to centralize error handling (Activity 1 had none)

const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  const errorResponse = {
    status: statusCode >= 500 ? 'error' : 'fail',
    message: err.message || 'Internal Server Error'
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;