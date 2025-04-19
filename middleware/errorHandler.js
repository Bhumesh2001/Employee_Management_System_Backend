const { errorResponse } = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
    console.error('🔥 Error:', err);

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return errorResponse(res, 'Validation failed', 400, messages);
    }

    // Duplicate Key Error (e.g., email, username)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        return errorResponse(res, `Duplicate field value: ${field}`, 400);
    }

    // Cast Error (Invalid ObjectId)
    if (err.name === 'CastError') {
        return errorResponse(res, 'Invalid ID format', 400);
    }

    // Default to 500 server error
    return errorResponse(res, err.message || 'Server Error', 500);
};

module.exports = errorHandler;
