const express = require('express');
const contactRoute = express.Router();
const contactModel = require('../Models/contactModel');

// Create new contact message
contactRoute.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required"
            });
        }

        const contact = await contactModel.create({
            name,
            email,
            subject,
            message,
            createdAt: new Date()
        });

        res.status(201).json({
            status: "success",
            message: "Message sent successfully",
            data: contact
        });
    } catch (error) {
        console.error('Contact creation error:', error);
        res.status(500).json({
            status: "error",
            message: "Failed to send message"
        });
    }
});

// Get all contact messages (for admin)
contactRoute.get('/', async (req, res) => {
    try {
        const contacts = await contactModel.find().sort({ createdAt: -1 });
        res.json({
            status: "success",
            data: contacts
        });
    } catch (error) {
        console.error('Contact fetch error:', error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch messages"
        });
    }
});

module.exports = contactRoute;