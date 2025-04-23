const Employee = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const { signToken } = require('../utils/jwtHelper');
const { setAuthTokenCookie } = require('../utils/cookieHelper');

// Register Admin
exports.Register = async (req, res, next) => {
    try {
        const existing = await Employee.findOne({ email: req.body.email });
        if (existing) return errorResponse(res, 'Email already registered', 400);

        const admin = await Employee.create(req.body);

        return successResponse(res, 'Registered successfully!', admin, 201);
    } catch (error) {
        next(error);
    }
};

// Login Admin
exports.Login = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        const data = await Employee.findOne({ email, role: role ? role : 'admin' }).select('+password')
        if (!data) return errorResponse(res, 'Invalid credentials', 401);

        const isMatch = await data.comparePassword(password);
        if (!isMatch) return errorResponse(res, 'Invalid credentials', 401);

        const token = signToken({ id: data._id, role: data.role });
        setAuthTokenCookie(res, data.role, token);

        return successResponse(res, 'Logged in successfully!', { token, ...data.toObject() });
    } catch (error) {
        next(error);
    }
};

// Get Profile
exports.getProfile = async (req, res, next) => {
    try {
        const user = await Employee.findById(req.user.id).select('-password');
        if (!user) return errorResponse(res, 'User not found', 404);

        return successResponse(res, 'User profile fetched successfully', user);
    } catch (error) {
        next(error);
    }
};

// Logout
exports.logout = (req, res) => {
    const role = req.body.role;

    // Common cookie options based on environment
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    // Clear role-specific token
    if (role === 'admin') {
        res.clearCookie('admin_token', cookieOptions);
    } else if (role === 'employee') {
        res.clearCookie('employee_token', cookieOptions);
    }

    return successResponse(res, 'Logged out successfully!');
};