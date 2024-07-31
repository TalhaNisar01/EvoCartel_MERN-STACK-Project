const orderModel = require("../models/orderModel");
const addToCartModel = require("../models/cartProduct");
const productModel = require("../models/productModel");

const createOrderController = async (req, res) => {
    try {
        const currentUser = req.user?.id;

        // Find all cart items for the current user
        const cartItems = await addToCartModel.find({ userId: currentUser });

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "No items in the cart to place an order",
                success: false,
                error: true
            });
        }

        // Prepare order items and calculate total amount
        let totalAmount = 0;
        const orderItems = await Promise.all(cartItems.map(async (cartItem) => {
            const product = await productModel.findById(cartItem.productId);
            totalAmount += product.sellingPrice * cartItem.quantity;

            return {
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                price: product.sellingPrice
            };
        }));

        // Create order payload
        const orderPayload = {
            userId: currentUser,
            items: orderItems,
            totalAmount: totalAmount,
            status: 'Pending'
        };

        // Save order to database
        const newOrder = new orderModel(orderPayload);
        const savedOrder = await newOrder.save();

        // Clear user's cart after placing the order
        await addToCartModel.deleteMany({ userId: currentUser });

        return res.status(201).json({
            data: savedOrder,
            message: "Order has been placed successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while placing the order",
            error: true,
            success: false
        });
    }
};

const getOrderController = async (req, res) => {
    try {
        const currentUser = req.user?.id;
        const orders = await orderModel.find({ userId: currentUser }).populate('items.productId');

        return res.status(200).json({
            data: orders,
            message: "Orders retrieved successfully",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while retrieving the orders",
            error: true,
            success: false
        });
    }
};

module.exports = {
    createOrderController,
    getOrderController
};
