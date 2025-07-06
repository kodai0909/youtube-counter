const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = 'AIzaSyCdPhVXzT5XWIautGgfaum4E-7_5Nwpf-E';
const CHANNEL_ID = 'UCn4Qwfgvya1RhUHuT6zevcg';

app.get('/subscriber-count', async (req, res) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    const response = await axios.get(url);
    const subscriberCount = parseInt(response.data.items[0].statistics.subscriberCount, 10);
    res.send(subscriberCount.toString());
  } catch (error) {
    res.status(500).send('0');
  }
});

app.listen(PORT, () => {
  console.log(`✅ http://localhost:${PORT}/subscriber-count`);
});
