const mongoose = require('mongoose');

const checkoutSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signup',
        required: true
    },
    items: [{
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
        img: String
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentId: String,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const CheckoutModel = mongoose.model('checkout', checkoutSchema);

module.exports = CheckoutModel;
