const nodemailer = require('nodemailer');

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shubhamkumar73481@gmail.com',
        pass: 'password' // Gmail App Password
    },
    secure: true,
    tls: {
        rejectUnauthorized: false
    }
});

// Function to format order items for email
const formatOrderItems = (items) => {
    return items.map(item => 
        `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`
    ).join('\n');
};

// Function to send order confirmation email
const sendOrderConfirmationEmail = async (orderDetails) => {
    try {
        const mailOptions = {
            from: '"Smart Canteen" <shubhamkumar73481@gmail.com>', // Replace with your Gmail email
            to: orderDetails.customerEmail,
            subject: `Order Confirmation #${orderDetails._id.toString().slice(-6).toUpperCase()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">
                        Thank you for your order!
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; margin-bottom: 15px;">Order Details</h3>
                        <p style="margin: 5px 0;"><strong>Order ID:</strong> #${orderDetails._id.toString().slice(-6).toUpperCase()}</p>
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(orderDetails.orderDate).toLocaleString()}</p>
                        <p style="margin: 5px 0;"><strong>Status:</strong> ${orderDetails.status}</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; margin-bottom: 15px;">Items Ordered</h3>
                        <div style="font-family: monospace; white-space: pre-line;">
                            ${formatOrderItems(orderDetails.items)}
                        </div>
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
                            <strong>Total Amount:</strong> ₹${orderDetails.totalAmount}
                        </div>
                    </div>

                    <div style="text-align: center; color: #6c757d; font-size: 0.9em; margin-top: 30px;">
                        <p>This is an automated message from Smart Canteen. Please do not reply to this email.</p>
                        <p>If you have any questions about your order, please contact our support team.</p>
                    </div>
                </div>
            `
        };

        console.log('Attempting to send order confirmation email to:', orderDetails.customerEmail);
        const info = await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully:', {
            messageId: info.messageId,
            to: orderDetails.customerEmail,
            response: info.response
        });
        return true;
    } catch (error) {
        console.error('Error sending order confirmation email:', {
            error: error.message,
            code: error.code,
            command: error.command,
            to: orderDetails.customerEmail
        });
        return false;
    }
};

// Function to send welcome email to new users
const sendWelcomeEmail = async (userDetails) => {
    try {
        const mailOptions = {
            from: '"Smart Canteen" <firstuser224@gmail.com>',
            to: userDetails.email,
            subject: 'Welcome to Smart Canteen! 🎉',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">
                        Welcome to Smart Canteen! 🎉
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; margin-bottom: 15px;">Hello ${userDetails.username}!</h3>
                        <p style="margin: 5px 0;">Thank you for joining Smart Canteen. We're excited to have you as part of our community!</p>
                        <p style="margin: 15px 0;">With your new account, you can:</p>
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>Order delicious food from our menu</li>
                            <li>Track your orders in real-time</li>
                            <li>View your order history</li>
                            <li>Receive special offers and updates</li>
                        </ul>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; margin-bottom: 15px;">Getting Started</h3>
                        <p>Visit our menu page to explore our delicious offerings and place your first order!</p>
                    </div>

                    <div style="text-align: center; color: #6c757d; font-size: 0.9em; margin-top: 30px;">
                        <p>This is an automated message from Smart Canteen. Please do not reply to this email.</p>
                        <p>If you have any questions, please contact our support team.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
};

// Function to send order status update email
const sendOrderStatusEmail = async (orderDetails) => {
    try {
        const statusMessages = {
            'preparing': 'Your order is being prepared by our chefs',
            'ready': 'Your order is ready for pickup',
            'completed': 'Your order has been completed',
            'cancelled': 'Your order has been cancelled'
        };

        const statusColors = {
            'preparing': '#17a2b8',
            'ready': '#28a745',
            'completed': '#198754',
            'cancelled': '#dc3545'
        };

        const mailOptions = {
            from: '"Smart Canteen" <firstuser224@gmail.com>',
            to: orderDetails.customerEmail,
            subject: `Order Status Update: ${orderDetails.status.toUpperCase()} #${orderDetails._id.toString().slice(-6).toUpperCase()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: ${statusColors[orderDetails.status]}; text-align: center; margin-bottom: 30px;">
                        Order Status Update
                    </h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; margin-bottom: 15px;">Status Update</h3>
                        <p style="margin: 5px 0; font-size: 1.2em; color: ${statusColors[orderDetails.status]};">
                            <strong>${statusMessages[orderDetails.status]}</strong>
                        </p>
                        <p style="margin: 15px 0;">
                            <strong>Order ID:</strong> #${orderDetails._id.toString().slice(-6).toUpperCase()}<br>
                            <strong>Updated:</strong> ${new Date().toLocaleString()}
                        </p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #2c3e50; margin-bottom: 15px;">Order Summary</h3>
                        <div style="font-family: monospace; white-space: pre-line;">
                            ${formatOrderItems(orderDetails.items)}
                        </div>
                        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #dee2e6;">
                            <strong>Total Amount:</strong> ₹${orderDetails.totalAmount}
                        </div>
                    </div>

                    ${orderDetails.status === 'ready' ? `
                        <div style="background-color: #28a745; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
                            <h3 style="margin-bottom: 15px;">Your Order is Ready!</h3>
                            <p>Please collect your order from the canteen counter.</p>
                        </div>
                    ` : ''}

                    <div style="text-align: center; color: #6c757d; font-size: 0.9em; margin-top: 30px;">
                        <p>This is an automated message from Smart Canteen. Please do not reply to this email.</p>
                        <p>If you have any questions about your order, please contact our support team.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Order status email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending order status email:', error);
        return false;
    }
};

module.exports = {
    sendOrderConfirmationEmail,
    sendWelcomeEmail,
    sendOrderStatusEmail
};
