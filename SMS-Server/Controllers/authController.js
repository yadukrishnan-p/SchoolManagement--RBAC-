const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const GenerateJWT = require('../Utils/jwt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');





exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }


        console.log('User ID:', user._id);
        console.log('User Role:', user.role);

        const token = await GenerateJWT({ id: user._id, role: user.role });
        // Check the generated token
        console.log('Generated Token:', token);

        res.status(200).json({
            token,
            user: { email: user.email, role: user.role },
            success: true,
            message: 'Login Successfully!'
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};



// Forgot Password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;

        await user.save();

        // Send the reset link via email
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `You requested a password reset. Please click the link below to reset your password: \n\n ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Reset email sent' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear the reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



// logOut
exports.logout = (req, res) => {
    res.status(200).json({ message: "Successfully logged out" });
};
