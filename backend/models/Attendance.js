const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  team: String,
  workplace: String,
  checkIn: { type: String, required: true }, // Time format: HH:mm
  checkOut: { type: String, required: true },
  totalHours: {
    type: Number,
    default: 0,
    get: function() {
      if (!this.checkIn || !this.checkOut) return 0;
      const [inHour, inMin] = this.checkIn.split(':').map(Number);
      const [outHour, outMin] = this.checkOut.split(':').map(Number);
      const inMinutes = inHour * 60 + inMin;
      const outMinutes = outHour * 60 + outMin;
      return ((outMinutes - inMinutes) / 60).toFixed(2);
    }
  },
  isOvertime: Boolean,
  color: { type: String, default: '#3B82F6' }, // Employee color tag
  feedback: String,
  recordedBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create compound index for employee and date
attendanceSchema.index({ employeeId: 1, date: 1 });

module.exports = mongoose.model('Attendance', attendanceSchema);