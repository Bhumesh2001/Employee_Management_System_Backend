const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    generatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payslip', payslipSchema);