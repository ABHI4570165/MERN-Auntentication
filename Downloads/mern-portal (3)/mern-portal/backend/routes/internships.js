const express = require('express');
const router  = express.Router();
const Internship = require('../models/Internship');
const auth    = require('../middleware/auth');

const fmt = (doc) => ({ ...doc.toObject(), id: doc._id.toString() });

// ── PUBLIC ───────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const data = await Internship.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(data.map(fmt));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PROTECTED ────────────────────────────────────────────────
router.get('/admin/all', auth, async (req, res) => {
  try {
    const data = await Internship.find().sort({ createdAt: -1 });
    res.json(data.map(fmt));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const doc   = new Internship(req.body);
    const saved = await doc.save();
    res.status(201).json(fmt(saved));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(fmt(updated));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
