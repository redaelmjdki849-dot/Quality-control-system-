const express = require('express');
const Attendance = require('../models/Attendance');
const Transport = require('../models/Transport');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get dashboard statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Attendance stats
    const attendanceToday = await Attendance.find({
      date: { $gte: today, $lt: tomorrow }
    });

    const totalEmployees = await User.countDocuments({ role: 'employee', isActive: true });
    const presentToday = attendanceToday.length;
    const absentToday = totalEmployees - presentToday;
    const totalHoursToday = attendanceToday.reduce((sum, record) => {
      if (record.checkIn && record.checkOut) {
        const [inHour, inMin] = record.checkIn.split(':').map(Number);
        const [outHour, outMin] = record.checkOut.split(':').map(Number);
        const hours = (outHour * 60 + outMin - inHour * 60 - inMin) / 60;
        return sum + hours;
      }
      return sum;
    }, 0);

    const overtimeHours = attendanceToday.reduce((sum, record) => {
      if (record.isOvertime) {
        const [inHour, inMin] = record.checkIn.split(':').map(Number);
        const [outHour, outMin] = record.checkOut.split(':').map(Number);
        const hours = (outHour * 60 + outMin - inHour * 60 - inMin) / 60;
        return sum + (hours > 8 ? hours - 8 : 0);
      }
      return sum;
    }, 0);

    const transportRecords = await Transport.countDocuments();

    res.json({
      totalEmployees,
      presentToday,
      absentToday,
      totalHoursToday: Math.round(totalHoursToday),
      overtimeHours: Math.round(overtimeHours),
      transportRecords
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

// Get attendance trend (last 7 days)
router.get('/attendance-trend', authenticate, async (req, res) => {
  try {
    const days = [];
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = await Attendance.countDocuments({
        date: { $gte: date, $lt: nextDate }
      });

      days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      data.push(count);
    }

    res.json({ days, data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trend', error: error.message });
  }
});

module.exports = router;