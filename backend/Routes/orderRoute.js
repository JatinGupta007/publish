const express = require('express');
const router = express.Router();
const CheckoutModel = require('../Models/checkoutModel');

// Get all orders
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all orders...');
        const orders = await CheckoutModel.find()
            .populate('userId', 'username email') // Include customer details
            .sort({ orderDate: -1 }); // Most recent first
        
        console.log(`Found ${orders.length} orders`);
        
        // Transform orders to include proper customer info
        const transformedOrders = orders.map(order => {
            const orderObj = order.toObject();
            // Get customer name from userId if available
            const customerName = orderObj.userId 
                ? orderObj.userId.username || orderObj.userId.email.split('@')[0] 
                : (orderObj.customerName || 'Guest');
            
            return {
                ...orderObj,
                customerName,
                customerEmail: orderObj.userId?.email || orderObj.customerEmail || 'No email provided',
                orderId: orderObj._id.toString().slice(-6).toUpperCase(),
                formattedDate: new Date(orderObj.orderDate).toLocaleString()
            };
        });

        res.json(transformedOrders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders: ' + error.message });
    }
});

// Update order status
router.patch('/:orderId/status', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await CheckoutModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate('userId', 'username email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order' });
    }
});

module.exports = router;
