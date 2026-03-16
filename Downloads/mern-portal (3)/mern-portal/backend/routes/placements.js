const express = require('express');
const router  = express.Router();
const Placement = require('../models/Placement');
const auth    = require('../middleware/auth');

const fmt = (doc) => ({ ...doc.toObject(), id: doc._id.toString() });

// ── PUBLIC ───────────────────────────────────────────────────
// GET /api/placements  → active listings only (no token needed)
router.get('/', async (req, res) => {
  try {
    const data = await Placement.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(data.map(fmt));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PROTECTED (admin only — requires valid JWT) ───────────────
// GET /api/placements/admin/all
router.get('/admin/all', auth, async (req, res) => {
  try {
    const data = await Placement.find().sort({ createdAt: -1 });
    res.json(data.map(fmt));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/placements
router.post('/', auth, async (req, res) => {
  try {
    const doc   = new Placement(req.body);
    const saved = await doc.save();
    res.status(201).json(fmt(saved));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/placements/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(fmt(updated));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/placements/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Placement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
