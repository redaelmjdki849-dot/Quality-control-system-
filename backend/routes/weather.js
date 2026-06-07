// Weather Routes - مسارات الطقس

const express = require('express');
const router = express.Router();
const {
  getCurrentWeather,
  getForecast,
  getWeatherByCoords
} = require('../services/weatherService');

/**
 * GET /api/weather/current?city=London
 * احصل على الطقس الحالي
 * Obtenir la météo actuelle
 */
router.get('/current', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({
      success: false,
      message: 'City name is required'
    });
  }
  
  const result = await getCurrentWeather(city);
  res.json(result);
});

/**
 * GET /api/weather/forecast?city=London
 * احصل على التوقعات
 * Obtenir les prévisions
 */
router.get('/forecast', async (req, res) => {
  const { city } = req.query;
  
  if (!city) {
    return res.status(400).json({
      success: false,
      message: 'City name is required'
    });
  }
  
  const result = await getForecast(city);
  res.json(result);
});

/**
 * GET /api/weather/coords?lat=51.5074&lon=-0.1278
 * احصل على الطقس من الإحداثيات
 * Obtenir la météo par coordonnées
 */
router.get('/coords', async (req, res) => {
  const { lat, lon } = req.query;
  
  if (!lat || !lon) {
    return res.status(400).json({
      success: false,
      message: 'Latitude and longitude are required'
    });
  }
  
  const result = await getWeatherByCoords(lat, lon);
  res.json(result);
});

module.exports = router;