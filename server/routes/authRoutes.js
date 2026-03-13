// authRoutes.js
import express from 'express';
import { register, login, logout, sendVerifyOtp, verifyEmail, isAunthenticated, sendResetOtp, verifyResetOtp } from '../controllers/authController.js'; 
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
// Corrected from 'sent-reset-otp' to 'send-reset-otp' to match frontend expectations
authRouter.post('/send-reset-otp', sendResetOtp); 
authRouter.post('/reset-password', verifyResetOtp);
authRouter.get('/is-auth', userAuth, isAunthenticated);

export default authRouter;