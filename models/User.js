const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false }, // hide by default
    name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], required: true },
    position: {
        type: String,
        required: function () {
            return this.role === 'employee';
        },
    },
});

// 🔐 Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔁 Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
