const express = require('express');
const weatherRoutes = require('./routes/weatherRoute');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config();

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    }
));
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
