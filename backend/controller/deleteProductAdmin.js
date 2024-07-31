const productModel = require('../models/productModel'); // Adjust the path as needed

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id; 
        console.log("Product Id to Delete:",productId)
     
        const deleteProductResult = await productModel.findByIdAndDelete(productId);

        if (!deleteProductResult) {
            return res.status(404).json({
                message: 'Product not found',
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: 'Product deleted successfully',
            error: false,
            success: true,
            data: deleteProductResult
        });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({
            message: err.message || 'Internal server error',
            error: true,
            success: false
        });
    }
};

module.exports = deleteProduct;
