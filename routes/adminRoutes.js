const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const validateRequest = require('../middleware/validationHandler');
const { registerValidator, loginValidator } = require('../validator/validator');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerValidator, validateRequest, adminController.Register);
router.post('/login', loginValidator, validateRequest, adminController.Login);
router.get('/profile', protect, adminController.getProfile);
router.post('/logout', adminController.logout);

module.exports = router;
