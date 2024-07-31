const userModel = require('../models/userModel');
const productModel = require('../models/productModel');

async function updateProductController(req, res) {
  try {
    const sessionUserId = req.user?.id; // Use req.user._id assuming req.user is set correctly by authToken middleware
    //  console.log("sessionUserId:",sessionUserId)
    // Fetch the user directly from the database
    const user = await userModel.findById(sessionUserId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user has ADMIN role
    if (user.role !== 'ADMIN') {
      throw new Error("Permission denied");
    }

    const { _id, ...resBody } = req.body;

    // Update the product
    const updatedProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

    if (!updatedProduct) {
      throw new Error("Product not found");
    }

    res.json({
      message: "Product updated successfully",
      data: updatedProduct,
      success: true,
      error: false
    });

  } catch (err) {
    console.error("Error in updateProductController:", err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}

module.exports = updateProductController;
