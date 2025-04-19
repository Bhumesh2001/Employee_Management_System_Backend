const Attendance = require('../models/Attendance');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// ✅ Mark Attendance (Sign In)
exports.signIn = async (req, res, next) => {
    try {
        const { employeeId } = req.user; // assuming JWT middleware adds this
        const today = new Date().toISOString().slice(0, 10); // format: yyyy-mm-dd

        // Check if already signed in today
        const alreadyMarked = await Attendance.findOne({
            employeeId,
            date: { $eq: new Date(today) }
        });

        if (alreadyMarked) return errorResponse(res, 'Already signed in today', 400);

        const attendance = await Attendance.create({
            employeeId,
            date: today,
            signIn: new Date().toLocaleTimeString()
        });

        return successResponse(res, 'Sign-in successful', attendance, 201);
    } catch (error) {
        next(error);
    }
};

// ✅ Mark Sign Out
exports.signOut = async (req, res, next) => {
    try {
        const { employeeId } = req.user;
        const today = new Date().toISOString().slice(0, 10);

        const attendance = await Attendance.findOne({
            employeeId,
            date: { $eq: new Date(today) }
        });

        if (!attendance) return errorResponse(res, 'Sign-in not found for today', 404);

        if (attendance.signOut) return errorResponse(res, 'Already signed out', 400);

        attendance.signOut = new Date().toLocaleTimeString();
        await attendance.save();

        return successResponse(res, 'Sign-out successful', attendance);
    } catch (error) {
        next(error);
    }
};

// ✅ Get Attendance History (for employee or admin)
exports.getAttendance = async (req, res, next) => {
    try {
        const { role, id } = req.user;

        const employeeId = role === 'admin' ? req.query.employeeId : id;

        const attendance = await Attendance.find({ employeeId })
            .populate('employeeId', 'name email postion')
            .sort({ date: -1 });

        return successResponse(res, 'Attendance fetched successfully', attendance);
    } catch (error) {
        next(error);
    }
};

// ✅ Get All Attendance (Admin only)
exports.getAllAttendance = async (req, res, next) => {
    try {
        const attendance = await Attendance.find()
            .populate('employeeId', 'name email position')
            .sort({ date: -1 });

        return successResponse(res, 'All attendance records fetched successfully', attendance);
    } catch (error) {
        next(error);
    }
};
