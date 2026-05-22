const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const SignUpModels = require('../Models/signupModels');
const CheckoutModel = require('../Models/checkoutModel');

// Get all customers
router.get('/customers', async (req, res) => {
  try {
    const customers = await SignUpModels.find({ isManager: { $ne: true } })
      .select('username email createdAt')
      .sort({ createdAt: -1 });
    
    if (!customers) {
      return res.status(404).json({ message: 'No customers found' });
    }
    
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Error fetching customers', error: error.message });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await CheckoutModel.find()
      .populate('userId', 'username email')
      .sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.patch('/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    
    const order = await CheckoutModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('userId', 'username email');
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer order history
router.get('/customers/:customerId/orders', async (req, res) => {
  try {
    const { customerId } = req.params;
    
    // Validate if customer exists
    const customerExists = await SignUpModels.findById(customerId);
    if (!customerExists) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    const orders = await CheckoutModel.find({ userId: customerId })
      .sort({ orderDate: -1 })
      .select('items totalAmount status orderDate');
      
    res.json(orders);
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({ message: 'Error fetching customer orders', error: error.message });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalOrders,
      ordersToday,
      totalCustomers,
      totalRevenue
    ] = await Promise.all([
      CheckoutModel.countDocuments(),
      CheckoutModel.countDocuments({
        orderDate: { $gte: today }
      }),
      SignUpModels.countDocuments({ isManager: { $ne: true } }),
      CheckoutModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" }
          }
        }
      ])
    ]);

    const pendingOrders = await CheckoutModel.find({
      status: { $in: ['pending', 'preparing'] }
    }).countDocuments();

    res.json({
      totalOrders,
      ordersToday,
      totalCustomers,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get reports data
router.get('/reports', async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const [monthlyRevenue, popularItems, customerStats] = await Promise.all([
      // Monthly revenue
      CheckoutModel.aggregate([
        {
          $match: {
            orderDate: { $gte: oneMonthAgo }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$orderDate" },
              month: { $month: "$orderDate" },
              day: { $dayOfMonth: "$orderDate" }
            },
            revenue: { $sum: "$totalAmount" }
          }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
      ]),

      // Popular items
      CheckoutModel.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.name",
            totalOrdered: { $sum: "$items.quantity" },
            revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
          }
        },
        { $sort: { totalOrdered: -1 } },
        { $limit: 5 }
      ]),

      // Customer statistics
      SignUpModels.aggregate([
        {
          $match: { isManager: { $ne: true } }
        },
        {
          $lookup: {
            from: "checkouts",
            localField: "_id",
            foreignField: "userId",
            as: "orders"
          }
        },
        {
          $project: {
            _id: 1,
            username: 1,
            email: 1,
            totalOrders: { $size: "$orders" },
            totalSpent: {
              $sum: "$orders.totalAmount"
            }
          }
        },
        { $sort: { totalOrders: -1 } },
        { $limit: 5 }
      ])
    ]);

    res.json({
      monthlyRevenue,
      popularItems,
      customerStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();
        const { password } = req.body;
        
        // Specifically look for manager account
        const user = await SignUpModels.findOne({ 
            email: email,
            isManager: true 
        });
        
        if (!user) {
            return res.status(401).json({
                msg: "unauthorized",
                error: "This account does not have manager privileges"
            });
        }

        // Verify manager status again for security
        if (!user.isManager) {
            return res.status(401).json({
                msg: "unauthorized",
                error: "Invalid manager account"
            });
        }

        // Check password
        if (user.password === password) {
            // Log successful manager login
            console.log('Manager login successful:', {
                email: user.email,
                isManager: user.isManager
            });
            
            return res.json({
                msg: "success",
                token: "manager-token",
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    isManager: user.isManager
                }
            });
        } else {
            return res.status(401).json({
                msg: "Failed",
                error: "Invalid password"
            });
        }
    } catch (error) {
        console.error('Manager login error:', error);
        return res.status(500).json({
            msg: "error",
            error: "Internal server error"
        });
    }
});

module.exports = router;
