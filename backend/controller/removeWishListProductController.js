const wishlistProductModel = require("../models/wishlistProductModel");

const removeFromWishlistController = async (req, res) => {
    try {
        const currentUser = req.user?.id;  // Get current user ID from the request
        const { productId } = req.body;    // Extract product ID from the request body

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false
            });
        }

        // Find and remove the wishlist item for the current user and given product ID
        const result = await wishlistProductModel.findOneAndDelete({
            userId: currentUser,
            productId: productId
        });

        if (!result) {
            return res.status(404).json({
                message: "Wishlist item not found",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "Product removed from wishlist successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = removeFromWishlistController;
