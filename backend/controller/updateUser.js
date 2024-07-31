const userModel = require("../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.user?.id; // Ensure to use the correct property based on your middleware
        // console.log("Session User ID:", sessionUser);
       
        // Check if sessionUser exists
        if (!sessionUser) {
            return res.status(401).json({
                message: "Unauthorized user",
                error: true,
                success: false
            });
        }

        const { userId, email, name, role } = req.body;

        // Validate userId
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false
            });
        }

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        // Check if the session user exists
        const user = await userModel.findById(sessionUser);
        console.log("User Role:", user.role);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Verify if the user has the correct permissions to update user roles
        if (user.role !== 'ADMIN' && user.role !== 'admin') {
            return res.status(403).json({
                message: "You do not have permission to perform this action",
                error: true,
                success: false
            });
        }

        // Update the user information
        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User's Role to update not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: updatedUser,
            message: "User Role has been Updated",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = { updateUser };
