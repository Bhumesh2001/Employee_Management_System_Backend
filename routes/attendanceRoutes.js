const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware'); // JWT middleware

// Employee Routes
router.post('/signin', protect, attendanceController.signIn);
router.post('/signout', protect, attendanceController.signOut);

// Admin & Employee: Get own or user's attendance
router.get('/', protect, attendanceController.getAttendance);
// Protect this route and make sure only logged-in users can access
router.get('/all', protect, authorize('admin'), attendanceController.getAllAttendance);

module.exports = router;
