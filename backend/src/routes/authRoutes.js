const express = require('express');
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validationMiddleware');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);
router.get('/profile', authMiddleware, authController.profile);

module.exports = router;
