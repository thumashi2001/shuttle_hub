const TshirtDesign = require('../models/TshirtDesign');

// Create a new T-shirt design
exports.createDesign = async (req, res) => {
  try {
    const { size, color, design, position, logo } = req.body;
    const newDesign = new TshirtDesign({ size, color, design, position, logo });
    await newDesign.save();
    res.status(201).json(newDesign);
  } catch (error) {
    res.status(500).json({ message: 'Error creating design', error });
  }
};

// Get all T-shirt designs
exports.getAllDesigns = async (req, res) => {
  try {
    const designs = await TshirtDesign.find();
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designs', error });
  }
};

// Update a T-shirt design
exports.updateDesign = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDesign = await TshirtDesign.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedDesign);
  } catch (error) {
    res.status(500).json({ message: 'Error updating design', error });
  }
};

// Delete a T-shirt design
exports.deleteDesign = async (req, res) => {
  try {
    const { id } = req.params;
    await TshirtDesign.findByIdAndDelete(id);
    res.status(200).json({ message: 'Design deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting design', error });
  }
};