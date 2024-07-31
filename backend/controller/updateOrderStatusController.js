const orderModel = require("../models/orderModel");

const updateOrderStatusController = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({
                message: "Order ID and status are required",
                success: false,
                error: true
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: "Order not found",
                success: false,
                error: true
            });
        }

        return res.status(200).json({
            data: updatedOrder,
            message: "Order status updated successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred while updating the order status",
            error: true,
            success: false
        });
    }
};

module.exports = updateOrderStatusController;
