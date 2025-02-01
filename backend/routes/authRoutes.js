const express = require('express');

const {handleLogin,handleLogout,handleSignup,handleEmailVerify,handleForgotPassword,handleResetPassword,checkAuth} = require('../controllers/auth');
const {handleVerifyToken} = require('../middlewares/verifyToken')

const router = express.Router();  

router.get('/check-auth', handleVerifyToken,checkAuth);
router.post("/signup",handleSignup);
router.post("/login",handleLogin);
router.post("/logout",handleLogout);
router.post('/verify-Email',handleEmailVerify);
router.post('/forgot-password',handleForgotPassword);
router.post('/reset-password/:token',handleResetPassword);


module.exports = router;
