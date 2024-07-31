// const userModel = require("../models/userModel");

// async function updateUserDetails(req, res) {
//     try {
//         const userId = req.params.id;
//         const updateData = req.body;
//         const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

//         if (!updatedUser) {
//             return res.status(404).json({
//                 message: "User not found",
//                 success: false,
//                 error: true
//             });
//         }

//         res.json({
//             message: "User updated successfully",
//             data: updatedUser,
//             success: true,
//             error: false
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = { updateUserDetails };



const userModel = require("../models/userModel");

async function updateUserDetails(req, res) {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        if (req.file) {
            updateData.profilePic = req.file.path;
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: true
            });
        }

        res.json({
            message: "User updated successfully",
            data: updatedUser,
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

module.exports = { updateUserDetails };
