const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, default: true },
  quantity: { type: Number, default: 0 }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
