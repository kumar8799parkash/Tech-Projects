import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

// Replace this with your real API key from API Ninjas: CJekOSp8BBzejJBmIm9+2A==bpj7awJys73wBKWH
const API_KEY = 'YOUR_API_KEY_HERE';

async function getWeather(city) {
  const url = `https://api.api-ninjas.com/v1/weather?city=${city}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY,
    }
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

// Express route
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;

  try {
    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
