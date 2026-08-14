// Central error handling middleware

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
  console.error(err.stack);

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Prepare error response
  const errorResponse = {
    status: statusCode >= 500 ? 'error' : 'fail',
    message: err.message || 'Internal Server Error'
  };

  // Include stack trace only in development environment
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;