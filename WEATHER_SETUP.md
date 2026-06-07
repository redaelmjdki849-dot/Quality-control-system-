# Weather Dashboard - Installation & Integration

## 🚀 Quick Start

### Step 1: Get API Key
```bash
# Visit: https://openweathermap.org/api
# Create free account
# Copy API key
```

### Step 2: Update Environment
```bash
# Edit .env file
OPENWEATHER_API_KEY=your_api_key_here
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quality-control
```

### Step 3: Install Dependencies
```bash
npm install axios
```

### Step 4: Update Server Routes
```javascript
// In backend/server.js
const weatherRoutes = require('./routes/weather');
app.use('/api/weather', weatherRoutes);
```

### Step 5: Import Component
```javascript
// In your main App.jsx or relevant component file
import WeatherDashboard from './components/WeatherDashboard';

// Use it:
<WeatherDashboard />
```

### Step 6: Run Application
```bash
npm start
```

## 📊 Testing Endpoints

### Current Weather
```bash
curl "http://localhost:5000/api/weather/current?city=Tokyo"
```

### Forecast
```bash
curl "http://localhost:5000/api/weather/forecast?city=Dubai"
```

### By Coordinates
```bash
curl "http://localhost:5000/api/weather/coords?lat=40.7128&lon=-74.0060"
```

## 🎨 Features Included

✅ Real-time weather data
✅ 5-day forecast
✅ Beautiful glassmorphism UI
✅ Multi-language support (EN, AR, FR)
✅ Weather logging to database
✅ Responsive design
✅ Weather icons
✅ Geolocation support

## 📱 Supported Cities

Any city worldwide! Examples:
- London, Paris, Tokyo, Dubai
- New York, Sydney, Toronto
- Cairo, Marrakech, Istanbul

## 🔐 Security Note

Keep your API key in `.env` file
Never commit `.env` to version control
Use environment variables in production

---

**Status:** ✅ Ready for Production