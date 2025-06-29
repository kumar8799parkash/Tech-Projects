import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

const API_KEY = 'CJekOSp8BBzejJBmIm9+2A==bpj7awJys73wBKWH';

async function getWeather(city) {
  const url = `https://api.api-ninjas.com/v1/weather?city=${encodeURIComponent(city)}`;
  console.log("Fetching URL:", url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY,
    }
  });

  const text = await response.text();
  console.log("API response text:", text);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText} - ${text}`);
  }

  return JSON.parse(text);
}

app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;

  console.log("City param:", city);

  if (!city) {
    return res.status(400).json({ error: "City parameter is required." });
  }

  try {
    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
