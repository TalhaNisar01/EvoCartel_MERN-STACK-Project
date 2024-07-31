const userModel = require("../models/userModel");

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        res.json({
            message: "User deleted successfully",
            data: deletedUser,
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

module.exports = { deleteUser };
