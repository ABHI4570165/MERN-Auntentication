import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

// Register a new user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please enter all fields" });
    }

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }   

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({id: user._id }, process.env.JWTR_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        }); 

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Our App',
            text: `Hi ${name}, your account has been successfully created! with eamil id email" ${email}`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (mailError) {
            // Note: We don't crash the request if the email fails, 
            // but you could log it to a service like Winston here.
        }

        return res.json({ success: true, message: "Registration successful" });
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
// Authenticate user and provide JWT token
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: "Please enter all fields" });
    }

    try {
        const user = await userModel.findOne({ email });
        if(!user){
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({id: user._id }, process.env.JWTR_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?  'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true, message: "Login successful" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
// Clear the authentication cookie to log the user out
export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ?  'none' : 'strict',
        });
        return res.json({ success: true, message: "Logout successful" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Sending OTP to user's email for account verification
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await userModel.findById(userId);

        if (!user) return res.json({ success: false, message: "User not found" });
        if (user.isAccountVerified) return res.json({ success: false, message: "Account already verified" });

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp; 
        user.verifyOtpExpiryAt = Date.now() + 10 * 60 * 1000; 

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            // text: `Your OTP is ${otp}. Verified within 10 mins.`,
            html:EMAIL_VERIFY_TEMPLATE.replace('{{email}}', user.email).replace('{{otp}}', otp)
        };

        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "OTP sent to your email" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Verifying the OTP and activating the user's account
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if(!userId || !otp) return res.json({ success: false, message: "Missing Details" });

    try {
        const user = await userModel.findById(userId);
        if(!user) return res.json({ success: false, message: "User not found" });

        if(user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if(user.verifyOtpExpiryAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpiryAt = 0;
        
        await user.save();
        return res.json({ success: true, message: "Email verified successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}
// Check if the user is authenticated 
export const isAunthenticated = async (req, res) => {
        try {
            return res.json({ success: true, message: "User is authenticated" });
        }catch (error) {
            return res.json({ success: false, message: error.message });
        }
}

// Send OTP to user's email for password reset
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    if(!email) return res.json({ success: false, message: "Email is required" });

    try {

        const user = await userModel.findOne({ email });

        if(!user) return res.json({ success: false, message: "User not found" });

         const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp; 
        user.resetOtpExpiryAt = Date.now() + 10 * 60 * 1000; 
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            // text: `Your OTP for password reset is ${otp}. Valid for 10 mins.`
            html: PASSWORD_RESET_TEMPLATE.replace('{{email}}', user.email).replace('{{otp}}', otp)

        };
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "OTP sent to your email" });


    }catch (error) {
        return res.json({ success: false, message: error.message });
    }

}

// Verify the OTP and reset the user's password
export const verifyResetOtp = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if(!email || !otp || !newPassword) return res.json({ success: false, message: "Missing Details" });

    try {
        const user = await userModel.findOne({ email });
        if(!user) return res.json({ success: false, message: "User not found" });

        if(user.resetOtp === '' || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }

        if(user.resetOtpExpiryAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpiryAt = 0;
        
        await user.save();
        
        return res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

