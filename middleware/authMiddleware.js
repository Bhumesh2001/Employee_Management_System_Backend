const { errorResponse } = require('../utils/responseHandler');
const { verifyToken } = require('../utils/jwtHelper');
const User = require('../models/User');

// 🔐 Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    // Check Authorization header
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check both admin and employee cookies
    if (!token && req.cookies?.admin_token) {
        token = req.cookies.admin_token;
    }

    if (!token && req.cookies?.employee_token) {
        token = req.cookies.employee_token;
    }

    if (!token) return errorResponse(res, 'Not authorized, token missing', 401);

    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        if (!user) return errorResponse(res, 'User not found', 404);

        req.user = { id: user._id, role: user.role, employeeId: user._id };
        next();
    } catch (error) {
        next(error);
    }
};

// 🔒 Middleware for role-based access control
const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
        return errorResponse(res, 'Access denied', 403);
    }
    next();
};

module.exports = { protect, authorize };
