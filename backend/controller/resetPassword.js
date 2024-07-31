const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel'); // Ensure this is properly imported

async function resetPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
        console.log('Reset Password Request:', { token, newPassword });

        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Check if newPassword is defined
        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }

        // Update the password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error in resetPassword:', error); // Log error to server console
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = resetPassword;
