---

### ✅ **Backend `README.md`**

```markdown
# 🔐 Employee Management System – Backend

This is the **backend** for the Employee Management System, built using **Node.js, Express, and MongoDB**. It provides a robust and secure RESTful API for managing authentication, employee records, attendance, leaves, and payslips.

## 🚀 Features

- JWT & Cookie-based Authentication
- Role-based Authorization (Admin & Employee)
- CRUD Operations for Employees
- Leave Application and Approval
- Attendance Tracking
- Payslip Generation (PDF-ready structure)
- Optimized Mongoose Models and Routes

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Authentication
- dotenv for environment config
- CORS & Cookie-parser for secure API handling

## 📂 Folder Structure
```

backend/ ├── controllers/ ├── middlewares/ ├── models/ ├── routes/ ├── utils/ ├── app.js └── server.js

## ⚙️ Setup Instructions

1. Clone the repo:

   ```bash
   git clone <backend-repo-url>
   cd backend

   ```

2. Install Dependencies
   npm install

3. Create a .env file and configure:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Start the server:

   npm start || npm run dev

5. Server will run on http://localhost:5000
   ✅ Use tools like Postman to test API endpoints or connect with the React frontend for a full-stack experience.
