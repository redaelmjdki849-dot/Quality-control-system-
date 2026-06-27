const express = require('express');
const Attendance = require('../models/Attendance');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all attendance records (with filters)
router.get('/', authenticate, async (req, res) => {
  try {
    const { startDate, endDate, employeeId, team, workplace, filterType } = req.query;
    let query = {};

    // Build date filter
    if (filterType) {
      const now = new Date();
      let start = new Date();

      switch (filterType) {
        case 'day':
          start.setHours(0, 0, 0, 0);
          break;
        case 'week':
          start.setDate(now.getDate() - now.getDay());
          start.setHours(0, 0, 0, 0);
          break;
        case 'month':
          start = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'year':
          start = new Date(now.getFullYear(), 0, 1);
          break;
      }

      query.date = { $gte: start };
    }

    if (startDate) query.date = { ...query.date, $gte: new Date(startDate) };
    if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
    if (employeeId) query.employeeId = employeeId;
    if (team) query.team = team;
    if (workplace) query.workplace = workplace;

    const records = await Attendance.find(query).sort({ date: -1 }).limit(1000);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch records', error: error.message });
  }
});

// Get single attendance record
router.get('/:id', authenticate, async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch record', error: error.message });
  }
});

// Create attendance record
router.post('/', authenticate, authorize(['admin', 'manager', 'hr', 'supervisor']), async (req, res) => {
  try {
    const { date, employeeId, employeeName, team, workplace, checkIn, checkOut, feedback, color } = req.body;

    const attendance = new Attendance({
      date: new Date(date),
      employeeId,
      employeeName,
      team,
      workplace,
      checkIn,
      checkOut,
      feedback,
      color,
      recordedBy: req.user.userId
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create record', error: error.message });
  }
});

// Update attendance record
router.put('/:id', authenticate, authorize(['admin', 'manager', 'hr']), async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update record', error: error.message });
  }
});

// Delete attendance record
router.delete('/:id', authenticate, authorize(['admin', 'hr']), async (req, res) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete record', error: error.message });
  }
});

module.exports = router;