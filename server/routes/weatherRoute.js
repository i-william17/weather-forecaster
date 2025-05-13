const express = require('express');
const weatherRoutes = express.Router();
const weatherController = require('../controllers/weatherController');

// GET /api/weather/:city
weatherRoutes.get('/', weatherController.getWeatherByCity);

module.exports = weatherRoutes;
