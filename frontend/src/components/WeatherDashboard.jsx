// Weather Dashboard Component - مكون لوحة الطقس

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './WeatherDashboard.css';

const WeatherDashboard = () => {
  const { t, i18n } = useTranslation();
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherRes = await axios.get('/api/weather/current', {
        params: { city: searchCity }
      });
      
      if (weatherRes.data.success) {
        setWeather(weatherRes.data.data);
      } else {
        setError(weatherRes.data.message);
      }
      
      // Fetch forecast
      const forecastRes = await axios.get('/api/weather/forecast', {
        params: { city: searchCity }
      });
      
      if (forecastRes.data.success) {
        setForecast(forecastRes.data.forecast);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`;
  };

  if (loading && !weather) {
    return <div className="weather-loading">{t('messages.loading')}</div>;
  }

  return (
    <div className="weather-dashboard">
      <h1>🌤️ {t('header.weather') || 'Weather Dashboard'}</h1>
      
      {/* Search Bar - شريط البحث */}
      <form onSubmit={handleSearch} className="weather-search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t('weather.searchCity') || 'Enter city name...'}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 {t('buttons.search') || 'Search'}
        </button>
      </form>
      
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}
      
      {weather && (
        <>
          {/* Current Weather Card - بطاقة الطقس الحالي */}
          <div className="weather-card current-weather">
            <div className="weather-header">
              <h2>{weather.city}, {weather.country}</h2>
              <img src={getWeatherIcon(weather.icon)} alt={weather.description} className="weather-icon" />
            </div>
            
            <div className="weather-main">
              <div className="temperature">
                <span className="temp-value">{Math.round(weather.temperature)}°C</span>
                <span className="temp-description">{weather.description}</span>
              </div>
              
              <div className="feels-like">
                {t('weather.feelsLike') || 'Feels Like'}: {Math.round(weather.feelsLike)}°C
              </div>
            </div>
            
            {/* Weather Details Grid - شبكة تفاصيل الطقس */}
            <div className="weather-details-grid">
              <div className="detail-item">
                <span className="detail-label">💧 {t('weather.humidity') || 'Humidity'}</span>
                <span className="detail-value">{weather.humidity}%</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">💨 {t('weather.windSpeed') || 'Wind Speed'}</span>
                <span className="detail-value">{weather.windSpeed} m/s</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">🌡️ {t('weather.pressure') || 'Pressure'}</span>
                <span className="detail-value">{weather.pressure} hPa</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">☁️ {t('weather.cloudiness') || 'Cloudiness'}</span>
                <span className="detail-value">{weather.cloudiness}%</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">👁️ {t('weather.visibility') || 'Visibility'}</span>
                <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">🌅 {t('weather.sunrise') || 'Sunrise'}</span>
                <span className="detail-value">{new Date(weather.sunrise).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          {/* Forecast Section - قسم التوقعات */}
          {forecast.length > 0 && (
            <div className="forecast-section">
              <h3>📅 {t('weather.forecast') || '5-Day Forecast'}</h3>
              <div className="forecast-grid">
                {forecast.slice(0, 8).map((item, index) => (
                  <div key={index} className="forecast-card">
                    <div className="forecast-time">
                      {new Date(item.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <img src={getWeatherIcon(item.icon)} alt={item.description} className="forecast-icon" />
                    <div className="forecast-temp">{Math.round(item.temperature)}°C</div>
                    <div className="forecast-humidity">💧 {item.humidity}%</div>
                    <div className="forecast-rain">🌧️ {Math.round(item.rainChance)}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;