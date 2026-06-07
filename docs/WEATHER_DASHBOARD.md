# Weather Dashboard Feature

## نظام لوحة الطقس
## Système de Tableau de Bord Météorologique

### 📋 Description

A comprehensive weather dashboard that fetches real-time data from OpenWeatherMap API.
لوحة طقس شاملة تجلب بيانات الطقس في الوقت الفعلي من OpenWeatherMap API.
Un tableau de bord météorologique complet qui récupère les données météorologiques en temps réel.

### ✨ Features | الميزات | Caractéristiques

✅ **Current Weather** - احصل على الطقس الحالي
- Real-time temperature and conditions
- Humidity, pressure, wind speed
- Visibility and cloud cover
- Sunrise/Sunset times

✅ **5-Day Forecast** - توقعات لمدة 5 أيام
- Hourly forecast data
- Rain probability
- Temperature trends

✅ **Location Search** - البحث عن المواقع
- Search by city name
- Geolocation support
- Multiple cities tracking

✅ **Beautiful UI** - واجهة جميلة
- Glassmorphism design
- Weather icons
- Responsive layout

✅ **Multi-language Support** - دعم متعدد اللغات
- English | الإنجليزية
- Arabic | العربية
- French | الفرنسية

### 🔧 Technical Stack

**Backend:**
- Express.js
- OpenWeatherMap API
- MongoDB (Weather logging)

**Frontend:**
- React
- Axios
- Chart.js
- i18next (Internationalization)

### 📝 Setup Instructions

#### 1. Get OpenWeatherMap API Key
- Visit: https://openweathermap.org/api
- Sign up for free
- Copy your API key

#### 2. Update .env file
```bash
OPENWEATHER_API_KEY=your_api_key_here
```

#### 3. Install Dependencies
```bash
npm install axios
```

#### 4. Import Components
```javascript
import WeatherDashboard from './components/WeatherDashboard';
```

### 📊 API Endpoints

**GET** `/api/weather/current?city=London`
- Returns current weather data

**GET** `/api/weather/forecast?city=London`
- Returns 5-day forecast

**GET** `/api/weather/coords?lat=51.5074&lon=-0.1278`
- Returns weather by coordinates

### 🌍 Example Usage

```bash
curl "http://localhost:5000/api/weather/current?city=Paris"
```

### ��� Data Structure

```json
{
  "city": "London",
  "country": "GB",
  "temperature": 15.5,
  "feelsLike": 14.2,
  "humidity": 72,
  "pressure": 1013,
  "windSpeed": 3.5,
  "description": "partly cloudy",
  "sunrise": "2024-06-07T05:30:00Z",
  "sunset": "2024-06-07T21:15:00Z",
  "visibility": 10000,
  "cloudiness": 45
}
```

---

**Created:** 2024-06-07
**Status:** Ready for integration