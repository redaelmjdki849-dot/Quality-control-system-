// Backend Server - خادم النسخة الخلفية - Serveur Backend

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quality-control')
  .then(() => console.log('✅ Database Connected | قاعدة البيانات متصلة'))
  .catch(err => console.log('❌ Database Error:', err));

// Routes - الطرق
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🚀 الخادم يعمل على المنفذ ${PORT}`);
  console.log(`🚀 Le serveur s'exécute sur le port ${PORT}`);
});

module.exports = app;