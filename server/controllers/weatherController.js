const axios = require('axios');

const API_KEY = process.env.OPENWEATHER_API_KEY || '9d007a31eaad681fb5d188294ab8a859';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

exports.getWeatherByCity = async (req, res) => {
  const city = req.query.city;

  if (!city || city.trim() === '') {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;

    const weatherDetails = {
      city: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      temperature: {
        current: data.main.temp,
        feels_like: data.main.feels_like,
        min: data.main.temp_min,
        max: data.main.temp_max,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
      },
      wind: {
        speed: data.wind.speed,
        direction: data.wind.deg,
      },
      clouds: data.clouds.all,
      weather: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      timezone: data.timezone,
      timestamp: data.dt,
    };

    res.status(200).json(weatherDetails);
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to retrieve weather data',
      details: error.response?.data || error.message,
    });
  }
};
