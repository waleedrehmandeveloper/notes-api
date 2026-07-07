/**
 * Centralized Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error console for development debugging
  console.error('Error Details:', err);

  // Mongoose Bad ObjectId format (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}. Invalid ObjectId format.`;
    return res.status(400).json({
      success: false,
      message: message
    });
  }

  // Mongoose Validation Error (e.g. missing required fields)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    return res.status(400).json({
      success: false,
      message: message
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return res.status(400).json({
      success: false,
      message: message
    });
  }

  // Default fallback internal server error
  const statusCode = err.statusCode || res.statusCode || 500;
  res.status(statusCode === 200 ? 500 : statusCode).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
