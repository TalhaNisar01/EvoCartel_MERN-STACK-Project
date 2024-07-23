const userModel = require("../models/userModel");

const uploadProductPermission = async (user) => {
    const userId = await userModel.findById(user);

    if (!user) {
        console.error(`User not found for ID: ${userId}`);
        throw new Error("User not found");
    }

    if (user.role === 'ADMIN') {
        return true;
    }

    return false;
};

module.exports = uploadProductPermission;
