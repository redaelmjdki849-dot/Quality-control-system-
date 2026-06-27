const express = require('express');
const Transport = require('../models/Transport');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all transport records
router.get('/', authenticate, async (req, res) => {
  try {
    const { month, year, place, status } = req.query;
    let query = {};

    if (month && year) {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, parseInt(month) + 1, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (place) query.place = place;
    if (status) query.status = status;

    const records = await Transport.find(query).sort({ date: -1 }).limit(1000);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error: error.message });
  }
});

// Get single transport record
router.get('/:id', authenticate, async (req, res) => {
  try {
    const record = await Transport.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch record', error: error.message });
  }
});

// Create transport record
router.post('/', authenticate, authorize(['admin', 'manager', 'supervisor']), async (req, res) => {
  try {
    const { date, transportName, place, checkIn, checkOut, targetHours, notes } = req.body;

    const transport = new Transport({
      date: new Date(date),
      transportName,
      place,
      checkIn,
      checkOut,
      targetHours,
      notes,
      recordedBy: req.user.userId
    });

    await transport.save();
    res.status(201).json(transport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create record', error: error.message });
  }
});

// Update transport record
router.put('/:id', authenticate, authorize(['admin', 'manager']), async (req, res) => {
  try {
    const record = await Transport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update record', error: error.message });
  }
});

// Delete transport record
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const record = await Transport.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete record', error: error.message });
  }
});

module.exports = router;