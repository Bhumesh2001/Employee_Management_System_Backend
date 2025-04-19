const { validationResult } = require('express-validator');
const { errorResponse } = require('../utils/responseHandler');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(err => ({
            field: err.param,
            message: err.msg,
        }));
        return errorResponse(res, 'Validation error', 400, formattedErrors);
    }
    next();
};

module.exports = validateRequest;
