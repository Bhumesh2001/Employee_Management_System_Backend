const Leave = require('../models/Leave');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// EMPLOYEE - Apply for Leave
exports.applyLeave = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.body;

        if (new Date(endDate) < new Date(startDate)) {
            return errorResponse(res, 'End date must be after start date', 400);
        }

        const leave = await Leave.create({
            employeeId: req.user.id,
            startDate,
            endDate,
        });

        return successResponse(res, 'Leave applied successfully', leave, 201);
    } catch (err) {
        next(err);
    }
};

// EMPLOYEE - View Own Leaves
exports.getMyLeaves = async (req, res, next) => {
    try {
        const leaves = await Leave.find({ employeeId: req.user.id });
        return successResponse(res, 'Fetched successfully', leaves);
    } catch (err) {
        next(err);
    }
};

// ADMIN - View All Leaves
exports.getAllLeaves = async (req, res, next) => {
    try {
        const leaves = await Leave.find().populate('employeeId', 'name email');
        return successResponse(res, 'All leave applications', leaves);
    } catch (err) {
        next(err);
    }
};

// ADMIN - Approve or Reject Leave
exports.updateLeaveStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['Approved', 'Rejected'].includes(status)) {
            return errorResponse(res, 'Invalid status value', 400);
        }

        const leave = await Leave.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!leave) return errorResponse(res, 'Leave not found', 404);

        return successResponse(res, `Leave ${status.toLowerCase()} successfully`, leave);
    } catch (err) {
        next(err);
    }
};
