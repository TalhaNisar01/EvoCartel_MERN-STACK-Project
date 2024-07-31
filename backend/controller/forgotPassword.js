const crypto = require('crypto');
const nodemailer = require('nodemailer');
const userModel = require('../models/userModel');
require('dotenv').config();

async function forgotPassword(req, res) {
    const { email } = req.body;
    console.log("Email:",email)
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        // Send email with the reset link
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            to: email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested to reset the password of your account.\n\n
                   Please click on the following link, or paste it into your browser to complete the process within one hour of receiving it:\n\n
                   http://localhost:3000/reset-password/${resetToken}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Password reset link has been sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = forgotPassword;

