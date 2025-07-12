const express = require('express');
const router = express.Router();

const Bus = require('../models/Bus');

// Utility to compute next arrival offset in ms
function getNextArrivalDiff(arrivalTime) {
  const now = new Date();
  const [hours, minutes] = arrivalTime.split(':').map(Number);
  const nextArrival = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  let diff = nextArrival - now;
  // if already passed today, consider tomorrow
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000;
  }
  return diff;
}

// GET /api/buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find().sort({ destination: 1, arrivalTime: 1 });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/buses/search?destination=xxx
router.get('/search', async (req, res) => {
  const { destination } = req.query;
  if (!destination) {
    return res.status(400).json({ error: 'destination query param required' });
  }
  try {
    // Build query
    const day = new Date().getDay();
    const matchAvailability = day === 0 || day === 6 ? ['daily'] : ['daily', 'weekdays'];

    const buses = await Bus.find({
      destination: { $regex: new RegExp(`^${destination}$`, 'i') },
      active: true,
      availability: { $in: matchAvailability },
    });

    // Map with diff and sort
    const sorted = buses
      .map((bus) => ({ ...bus._doc, nextArrivalDiff: getNextArrivalDiff(bus.arrivalTime) }))
      .sort((a, b) => a.nextArrivalDiff - b.nextArrivalDiff);

    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/buses
router.post('/', async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/buses/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Bus not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/buses/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Bus.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Bus not found' });
    res.json({ message: 'Bus deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;