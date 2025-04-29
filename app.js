const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFoundMiddlware');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();
const app = express();

// Allow listed origins
const allowedOrigins = [process.env.FONTEND_URL, "http://localhost:5173"];

// Debug incoming origin
app.use((req, res, next) => {
    console.log("🌐 Incoming request from origin:", req.headers.origin);
    next();
});

// CORS middleware with dynamic origin check
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("❌ Not allowed by CORS: " + origin));
        }
    },
    credentials: true
}));

// Body parser, cookies, and logging
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/adminRoutes'));
app.use('/api/employee', require('./routes/employeeRoutes'));
app.use('/api/leave', require('./routes/leaveRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/payslip', require('./routes/payslipRoutes'));

// Not Found & Error Handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));

module.exports = app;
