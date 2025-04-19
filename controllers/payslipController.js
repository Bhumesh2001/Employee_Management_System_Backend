const Payslip = require('../models/Payslip');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Create/generate payslip (Admin only)
exports.generatePayslip = async (req, res, next) => {
    try {
        const { employeeId, month, amount } = req.body;

        const existing = await Payslip.findOne({ employeeId, month });
        if (existing) return errorResponse(res, 'Payslip already exists for this month', 400);

        const payslip = await Payslip.create({ employeeId, month, amount });

        return successResponse(res, 'Payslip generated successfully', payslip, 201);
    } catch (error) {
        next(error);
    }
};

// Get payslips for a specific employee (employee only)
exports.getMyPayslips = async (req, res, next) => {
    try {
        const payslips = await Payslip.find({ employeeId: req.user.id }).sort({ generatedDate: -1 });

        return successResponse(res, 'Payslips fetched successfully', payslips);
    } catch (error) {
        next(error);
    }
};

// Get all payslips (admin)
exports.getAllPayslips = async (req, res, next) => {
    try {
        const payslips = await Payslip.find()
            .populate('employeeId', 'name email role')
            .sort({ generatedDate: -1 });

        return successResponse(res, 'All payslips fetched successfully', payslips);
    } catch (error) {
        next(error);
    }
};
