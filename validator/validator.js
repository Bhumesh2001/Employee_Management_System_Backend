const { body } = require('express-validator');

exports.registerValidator = [
    // Email must be valid
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),

    // Password must be at least 8 characters
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    // Name is required
    body('name')
        .notEmpty().withMessage('Name is required'),

    // Position is required if role is employee
    body('position')
        .custom((value, { req }) => {
            if (req.body.role === 'employee' && !value) {
                throw new Error('Position is required for employee');
            }
            return true;
        })
];

exports.loginValidator = [
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid'),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

exports.leaveValidator = [
    body('startDate')
        .notEmpty().withMessage('Start date is required')
        .isISO8601().withMessage('Start date must be in ISO8601 format'),

    body('endDate')
        .notEmpty().withMessage('End date is required')
        .isISO8601().withMessage('End date must be in ISO8601 format'),
];

exports.payslipValidator = [
    body('employeeId')
        .notEmpty().withMessage('Employee ID is required')
        .isMongoId().withMessage('Invalid employee ID'),

    body('month')
        .notEmpty().withMessage('Month is required')
        .isString().withMessage('Month must be a string'),

    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number')
        .custom(value => {
            if (value <= 0) throw new Error('Amount must be positive');
            return true;
        }),
];
