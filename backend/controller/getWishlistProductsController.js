const wishlistProductModel = require("../models/wishlistProductModel");
const productModel = require("../models/productModel");

const getWishlistProductsController = async (req, res) => {
    try {
        const currentUser = req.user?.id;

        const wishlistItems = await wishlistProductModel.find({ userId: currentUser })
            .populate('productId') 
            .exec();

        const wishlistProducts = wishlistItems.map(item => ({
            productId: item.productId._id,
            productName: item.productId.productName,
            brandName: item.productId.brandName,
            category: item.productId.category,
            productImage: item.productId.productImage,
            description: item.productId.description,
            price: item.productId.price,
            sellingPrice: item.productId.sellingPrice
        }));

        return res.json({
            data: wishlistProducts,
            message: "Wishlist products fetched successfully",
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

module.exports = getWishlistProductsController;
