const mongoose = require('mongoose');

const tshirtDesignSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  design: { type: String, required: true },
  position: { type: String, enum: ['front', 'back'], required: true },
  logo: { type: String }, // URL or base64 string for the logo
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TshirtDesign', tshirtDesignSchema);