const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

async function UploadProductController(req, res) {
    try {
        const sessionUserId =  req.user?.id;
        console.log(`Session User ID: ${sessionUserId}`); // Log the sessionUserId

        // Fetch the user directly from the database
        const user = await userModel.findById(sessionUserId);
        console.log(`User found: ${user}`); // Log the user object

        if (!user) {
            throw new Error("User not found");
        }

        // Check if the user has ADMIN role
        if (user.role !== 'ADMIN') {
            throw new Error("Permission denied");
        }

        // Save the product
        const uploadProduct = new productModel(req.body);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct
        });
    } catch (err) {
        console.error("Error in UploadProductController:", err);
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = UploadProductController;
