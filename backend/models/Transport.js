const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  transportName: { type: String, required: true },
  place: { type: String, required: true },
  checkIn: { type: String, required: true }, // Time format: HH:mm
  checkOut: { type: String, required: true },
  targetHours: { type: Number, default: 8 },
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
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'delayed'],
    default: 'completed'
  },
  notes: String,
  recordedBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create index for date
transportSchema.index({ date: 1 });

module.exports = mongoose.model('Transport', transportSchema);