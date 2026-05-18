const express = require('express');
const MenuItem = require('../Models/menuItemModel');
const router = express.Router();

// Get all menu items
router.get('/items', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update item availability
router.patch('/items/:id/availability', async (req, res) => {
  try {
    const { id } = req.params;
    const { available } = req.body;
    
    const item = await MenuItem.findOneAndUpdate(
      { id: id },
      { available },
      { new: true }
    );
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new menu item
router.post('/items', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
