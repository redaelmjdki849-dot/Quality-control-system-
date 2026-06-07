// Weather Dashboard Schema - مخطط لوحة الطقس

const mongoose = require('mongoose');

const WeatherLogSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    index: true
  },
  country: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  weather: {
    temperature: Number,
    feelsLike: Number,
    humidity: Number,
    pressure: Number,
    description: String,
    windSpeed: Number
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('WeatherLog', WeatherLogSchema);