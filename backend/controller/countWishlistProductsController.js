const wishlistProductModel = require("../models/wishlistProductModel");

const countWishlistProductsController = async (req, res) => {
    try {
        const currentUser = req.user?.id;

        // Count the number of wishlist products for the current user
        const count = await wishlistProductModel.countDocuments({ userId: currentUser });

        return res.json({
            data: { count },
            message: "Wishlist product count fetched successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = countWishlistProductsController;
