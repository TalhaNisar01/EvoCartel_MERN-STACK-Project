const userModel = require("../models/userModel");

async function userProfile(req, res) {
    try {
        const userId = req.params.id;
        console.log("Received user ID:", userId); 

        
        if (!userId) {
            return res.status(400).json({
                message: "User ID is missing",
                success: false,
                error: true
            });
        }

        const user = await userModel.findById(userId);
        console.log("User Profile Data:", user); // Debugging log

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        res.json({
            message: "User Profile",
            data: user,
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error in userProfile:", err); // Debugging log
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = userProfile;
