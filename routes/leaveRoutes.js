const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validationHandler');
const { leaveValidator } = require('../validator/validator');

// EMPLOYEE
router.post('/', protect, leaveValidator, validateRequest, leaveController.applyLeave); // Apply leave
router.get('/my', protect, leaveController.getMyLeaves); // View own leaves

// ADMIN
router.get('/', protect, authorize('admin'), leaveController.getAllLeaves);   // View all leaves
router.patch('/:id', protect, authorize('admin'), leaveController.updateLeaveStatus); // Approve/Reject leave

module.exports = router;
