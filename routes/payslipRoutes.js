const express = require('express');
const router = express.Router();
const payslipController = require('../controllers/payslipController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationHandler');
const { payslipValidator } = require('../validator/validator');

// Admin: generate payslip
router.post(
    '/',
    protect,
    authorize('admin'),
    payslipValidator,
    validateRequest,
    payslipController.generatePayslip
);

// Employee: get my payslips
router.get('/my', protect, authorize('employee'), payslipController.getMyPayslips);

// Admin: get all payslips
router.get('/', protect, authorize('admin'), payslipController.getAllPayslips);

module.exports = router;
