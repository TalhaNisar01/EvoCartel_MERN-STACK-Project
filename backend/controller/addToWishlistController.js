const wishlistProductModel = require("../models/wishlistProductModel");

const addToWishlistController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.user?.id;

        const isProductAvailable = await wishlistProductModel.findOne({ productId, userId: currentUser });

        if (isProductAvailable) {
            return res.json({
                message: "This product already exists in your wishlist",
                success: false,
                error: true
            });
        }

        const payload = {
            productId: productId,
            userId: currentUser
        };

        const newWishlistItem = new wishlistProductModel(payload);
        const saveProduct = await newWishlistItem.save();

        return res.json({
            data: saveProduct,
            message: "Product has been added to your wishlist",
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

module.exports = addToWishlistController;
