const CheckoutModel = require('./Models/checkoutModel');
const SignupModel = require('./Models/signupModels');
const MenuItem = require('./Models/menuItemModel');

const seedOrders = async () => {
    try {
        // Clear existing orders
        await CheckoutModel.deleteMany({});
        console.log('Cleared existing orders');

        // Get users and menu items
        const users = await SignupModel.find({ isManager: false });
        const menuItems = await MenuItem.find();
        
        if (users.length === 0 || menuItems.length === 0) {
            console.log('No users or menu items found to create orders');
            return;
        }

        // Create test orders
        const orders = [
            // First order - 2 Chocolate Chip Cookies and 1 Tea
            {
                userId: users[0]._id,
                items: [
                    {
                        id: 5, // Chocolate Chip Cookies
                        name: "Chocolate Chip Cookies",
                        price: 10,
                        quantity: 2,
                        img: "/a6.avif"
                    },
                    {
                        id: 4, // Tea
                        name: "Tea",
                        price: 20,
                        quantity: 1,
                        img: "/a5.avif"
                    }
                ],
                totalAmount: (10 * 2) + 20, // 2 cookies at 10 each + 1 tea at 20
                status: 'pending',
                orderDate: new Date(),
                paymentId: 'pay_' + Math.random().toString(36).substr(2, 9)
            },
            // Khushi's order (preparing)
            {
                userId: users[1]._id,
                items: [
                    {
                        id: menuItems[12].id,
                        name: menuItems[12].name,
                        price: menuItems[12].price,
                        quantity: 1,
                        img: menuItems[12].image
                    },
                    {
                        id: menuItems[25].id,
                        name: menuItems[25].name,
                        price: menuItems[25].price,
                        quantity: 2,
                        img: menuItems[25].image
                    }
                ],
                totalAmount: menuItems[12].price + (menuItems[25].price * 2),
                status: 'preparing',
                orderDate: new Date(Date.now() - 15 * 60000), // 15 minutes ago
                paymentId: 'pay_' + Math.random().toString(36).substr(2, 9)
            },
            // Simran's order (completed)
            {
                userId: users[2]._id,
                items: [
                    {
                        id: menuItems[20].id,
                        name: menuItems[20].name,
                        price: menuItems[20].price,
                        quantity: 2,
                        img: menuItems[20].image
                    }
                ],
                totalAmount: menuItems[20].price * 2,
                status: 'completed',
                orderDate: new Date(Date.now() - 45 * 60000), // 45 minutes ago
                paymentId: 'pay_' + Math.random().toString(36).substr(2, 9)
            },
            // Megha's order (ready)
            {
                userId: users[3]._id,
                items: [
                    {
                        id: menuItems[16].id,
                        name: menuItems[16].name,
                        price: menuItems[16].price,
                        quantity: 1,
                        img: menuItems[16].image
                    },
                    {
                        id: menuItems[23].id,
                        name: menuItems[23].name,
                        price: menuItems[23].price,
                        quantity: 2,
                        img: menuItems[23].image
                    }
                ],
                totalAmount: menuItems[16].price + (menuItems[23].price * 2),
                status: 'ready',
                orderDate: new Date(Date.now() - 5 * 60000), // 5 minutes ago
                paymentId: 'pay_' + Math.random().toString(36).substr(2, 9)
            },
            // Aman's second order (ready)
            {
                userId: users[0]._id,
                items: [
                    {
                        id: menuItems[19].id,
                        name: menuItems[19].name,
                        price: menuItems[19].price,
                        quantity: 1,
                        img: menuItems[19].image
                    }
                ],
                totalAmount: menuItems[19].price,
                status: 'ready',
                orderDate: new Date(Date.now() - 20 * 60000), // 20 minutes ago
                paymentId: 'pay_' + Math.random().toString(36).substr(2, 9)
            }
        ];

        // Insert orders into database
        await CheckoutModel.insertMany(orders);
        console.log('Orders seeded successfully');

    } catch (error) {
        console.error('Error seeding orders:', error);
    }
};

module.exports = seedOrders;
