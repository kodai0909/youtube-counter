const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// APIキーとチャンネルID（すでに置き換え済み）
const API_KEY = 'AIzaSyCdPhVXzT5XWIautGgfaum4E-7_5Nwpf-E';
const CHANNEL_ID = 'UCn4Qwfgvya1RhUHuT6zevcg';

app.get('/subscriber-count', async (req, res) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    const response = await axios.get(url);
    const count = parseInt(response.data.items[0].statistics.subscriberCount, 10);

    // Smiirl向けに正確な形式で返す（数字のみ、余計な空白なし）
    res.setHeader('Content-Type', 'text/plain');
    res.send(count.toString().trim());
  } catch (err) {
    // エラー時は "0" を返す（{}対策）
    res.setHeader('Content-Type', 'text/plain');
    res.send('0');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Smiirl対応API起動中：http://localhost:${PORT}/subscriber-count`);
});
