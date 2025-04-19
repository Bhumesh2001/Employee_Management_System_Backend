const { errorResponse } = require('../utils/responseHandler');

const notFound = (req, res, next) => {
    errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

module.exports = notFound;
