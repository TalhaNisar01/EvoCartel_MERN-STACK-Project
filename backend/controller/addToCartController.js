const addToCartModel = require("../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.user?.id;

        // console.log("Current User:", currentUser);

        // Check if the product is already in the cart for the current user
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        console.log("isProductAvailable:", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "This product already exists in your cart",
                success: false,
                error: true
            });
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product has been added to your cart",
            success: true,
            error: false
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
