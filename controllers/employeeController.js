const Employee = require('../models/User');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Payslip = require('../models/Payslip');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// Create Employee
exports.createEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body);
        return successResponse(res, 'Employee created successfully', employee, 201);
    } catch (error) {
        next(error);
    }
};

// Get All Employees
exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find({ role: 'employee' });
        return successResponse(res, 'Employees fetched successfully', employees);
    } catch (error) {
        next(error);
    }
};

// Get Single Employee
exports.getEmployeeById = async (req, res, next) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id, role: "employee" });
        if (!employee) {
            return errorResponse(res, 'Employee not found', 404);
        }

        return successResponse(res, 'Employee fetched successfully', employee);
    } catch (error) {
        next(error);
    }
};

// Update Employee
exports.updateEmployee = async (req, res, next) => {
    try {
        const { name, email, position } = req.body;
        const employee = await Employee.findById(req.params.id);
        if (!employee || employee.role !== 'employee') {
            return errorResponse(res, 'Employee not found or not an employee', 404);
        }

        // Update employee fields
        Object.assign(employee, { name, email, position });
        await employee.save();

        return successResponse(res, 'Employee updated successfully', employee);
    } catch (error) {
        next(error);
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findById(id);
        if (!employee) return errorResponse(res, 'Employee not found', 404);
        if (employee.role !== 'employee') return errorResponse(res, 'Not a valid employee', 400);

        // Delete employee-related data in parallel
        await Promise.all([
            Attendance.deleteMany({ employeeId: id }),
            Leave.deleteMany({ employeeId: id }),
            Payslip.deleteMany({ employeeId: id }),
            employee.deleteOne()
        ]);

        return successResponse(res, 'Employee and all related data deleted successfully');
    } catch (error) {
        next(error);
    }
};

