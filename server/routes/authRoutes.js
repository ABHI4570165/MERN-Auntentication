import express from 'express';
import { register, login, logout,sendVerifyOtp,verifyEmail, isAunthenticated, sendResetOtp, verifyResetOtp } from '../controllers/authController.js'; 
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp); // Assuming sendVerifyOtp is defined in your controller
authRouter.post('/verify-account', userAuth, verifyEmail); // Assuming verifyOtp is defined in your controller
authRouter.post('/sent-reset-otp', sendResetOtp); // Assuming verifyOtp is defined in your controller
authRouter.post('/reset-password', verifyResetOtp); // Assuming verifyOtp is defined in your controller
authRouter.get('/is-auth', userAuth, isAunthenticated); // Assuming isAunthenticated is defined in your controller


export default authRouter;