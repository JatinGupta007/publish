const express = require('express');
const router = express.Router();
const CheckoutModel = require('../Models/checkoutModel');
const SignupModel = require('../Models/signupModels');
const { sendOrderConfirmationEmail, sendOrderStatusEmail } = require('../utils/emailService');

// Create new order
router.post('/', async (req, res) => {
    try {
        const { items, totalAmount, email } = req.body;

        // Find the user by email
        const user = await SignupModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new order
        const order = new CheckoutModel({
            userId: user._id,
            items,
            totalAmount,
            status: 'pending',
            orderDate: new Date()
        });

        // Save the order
        await order.save();

        // Prepare order details for email
        const orderDetails = {
            _id: order._id,
            items: order.items,
            totalAmount: order.totalAmount,
            status: order.status,
            orderDate: order.orderDate,
            customerEmail: email
        };

        // Send confirmation email
        try {
            await sendOrderConfirmationEmail(orderDetails);
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // Don't fail the order if email fails
        }

        res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: order._id,
                items: order.items,
                totalAmount: order.totalAmount,
                status: order.status,
                orderDate: order.orderDate
            }
        });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
});

// Get orders by user email
router.get('/user/:email', async (req, res) => {
    try {
        const { email } = req.params;
        console.log('Fetching orders for email:', email);

        // Find user by email
        const user = await SignupModel.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('Found user:', user._id);

        // Find orders for this user
        const orders = await CheckoutModel.find({ userId: user._id })
            .sort({ orderDate: -1 });
        console.log('Found orders:', orders.length);

        res.json(orders);

    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

// Update order status
router.patch('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await CheckoutModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate('userId', 'email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send order status update email
        try {
            await sendOrderStatusEmail({
                _id: order._id,
                status,
                items: order.items,
                totalAmount: order.totalAmount,
                customerEmail: order.userId.email
            });
        } catch (emailError) {
            console.error('Error sending status update email:', emailError);
            // Don't fail the status update if email fails
        }

        res.json(order);

    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order' });
    }
});

// Get order by ID
router.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await CheckoutModel.findById(orderId)
            .populate('userId', 'username email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);

    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Error fetching order' });
    }
});

module.exports = router;
