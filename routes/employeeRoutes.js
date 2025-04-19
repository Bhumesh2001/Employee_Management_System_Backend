const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const validateRequest = require('../middleware/validationHandler');
const { protect, authorize } = require('../middleware/authMiddleware');
const { registerValidator } = require('../validator/validator');

// Routes
router
    .route('/')
    .get(protect, authorize('admin'), employeeController.getAllEmployees)
    .post(
        protect,
        authorize('admin'),
        registerValidator,
        validateRequest,
        employeeController.createEmployee
    );

router
    .route('/:id')
    .get(protect, employeeController.getEmployeeById)
    .put(protect, authorize('admin'), employeeController.updateEmployee)
    .delete(protect, authorize('admin'), employeeController.deleteEmployee);

module.exports = router;
