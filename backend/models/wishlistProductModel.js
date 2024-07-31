const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const wishlistProductModel = mongoose.model('wishlistProduct', wishlistProductSchema);

module.exports = wishlistProductModel;
