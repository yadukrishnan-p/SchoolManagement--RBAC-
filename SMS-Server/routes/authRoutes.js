const express = require ('express');
const {loginUser, forgotPassword, resetPassword, logout } = require('../Controllers/authController')

const {verifyToken} = require('../MiddleWare/authMiddleware');
const {authorize} = require('../MiddleWare/roleMiddleware');

const router = express.Router();



// logout route
router.post('/logout', logout);
// Login User
router.post('/login', loginUser);

// Route for Forgot Password
router.post('/forgot-password', forgotPassword);

// Route for Reset Password
router.post('/reset-password/:token', resetPassword);



module.exports = router;    