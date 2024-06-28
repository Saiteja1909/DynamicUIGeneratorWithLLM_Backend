// routes/definitions.js
const express = require('express');
const router = express.Router();
const UIDefinition = require('../models/UIDefinition');
const authenticate = require('../middleware/authMiddleware'); // Import your authentication middleware

// POST endpoint to save a new UI definition
router.post('/', authenticate, async (req, res) => {
  const { name, command, code } = req.body;
  const userId = req.user.id; // The user ID is now available here from the middleware
  try {
    const definition = new UIDefinition({
      userId,
      name,
      command,
      code
    });
    await definition.save();
    res.status(201).json(definition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET endpoint to retrieve all definitions for a user
router.get('/', authenticate, async (req, res) => {
    const userId = req.user.id;
  try {
    const definitions = await UIDefinition.find({ userId }).sort({ createdAt: -1 });
    res.json(definitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT endpoint to update an existing UI definition
router.put('/:id', authenticate, async (req, res) => {
    const { name, command, code } = req.body;
    try {
      const updatedDefinition = await UIDefinition.findByIdAndUpdate(
        req.params.id,
        { name, command, code },
        { new: true }
      );
      if (!updatedDefinition) {
        return res.status(404).json({ message: 'Definition not found' });
      }
      res.json(updatedDefinition);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// DELETE endpoint to delete a UI definition
router.delete('/:id', authenticate, async (req, res) => {
    try {
      const deletedDefinition = await UIDefinition.findOneAndDelete({ _id: req.params.id });
      if (!deletedDefinition) {
        return res.status(404).json({ message: 'Definition not found' });
      }
      res.json({ message: 'Definition deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  

module.exports = router;
