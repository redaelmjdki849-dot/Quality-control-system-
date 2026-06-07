// Weather API Service - خدمة API الطقس

const axios = require('axios');
require('dotenv').config();

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'demo_key';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather data
 * احصل على بيانات الطقس الحالية
 * Obtenir les données météorologiques actuelles
 */
const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    
    return {
      success: true,
      data: {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        windDeg: response.data.wind.deg,
        cloudiness: response.data.clouds.all,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        sunrise: new Date(response.data.sys.sunrise * 1000),
        sunset: new Date(response.data.sys.sunset * 1000),
        visibility: response.data.visibility,
        uvi: response.data.uvi || 'N/A'
      }
    };
  } catch (error) {
    console.error('Weather API Error:', error.message);
    return {
      success: false,
      error: error.message,
      message: 'Failed to fetch weather data'
    };
  }
};

/**
 * Fetch 5-day forecast
 * احصل على توقعات 5 أيام
 * Obtenir les prévisions 5 jours
 */
const getForecast = async (city) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    
    // Process forecast data
    const forecast = response.data.list.map(item => ({
      timestamp: new Date(item.dt * 1000),
      temperature: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      rainChance: item.pop * 100 // Probability of precipitation
    }));
    
    return {
      success: true,
      city: response.data.city.name,
      country: response.data.city.country,
      forecast: forecast
    };
  } catch (error) {
    console.error('Forecast API Error:', error.message);
    return {
      success: false,
      error: error.message,
      message: 'Failed to fetch forecast data'
    };
  }
};

/**
 * Fetch weather by coordinates
 * احصل على الطقس حسب الإحداثيات
 * Obtenir la météo par coordonnées
 */
const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        lat: lat,
        lon: lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    
    return {
      success: true,
      data: {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        coordinates: { lat, lon }
      }
    };
  } catch (error) {
    console.error('Weather by Coords Error:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  getCurrentWeather,
  getForecast,
  getWeatherByCoords
};