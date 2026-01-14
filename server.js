const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Serve frontend page
app.get('/', (req, res) => {
  res.send(`
    <h1>Express Frontend Application</h1>
    <button onclick="fetchData()">Fetch Data from Flask Backend</button>
    <div id="result"></div>
    <script>
      async function fetchData() {
        const response = await fetch('/api/status');
        const data = await response.json();
        document.getElementById('result').innerText = JSON.stringify(data);
      }
    </script>
  `);
});

// API route to call Flask backend
app.get('/api/status', async (req, res) => {
  try {
    const response = await axios.get('http://34.224.90.70/api/health');
    console.log('Backend response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching backend:', error.message);
    console.error('Error details:', error.response?.data);
    res.status(500).json({ error: 'Failed to fetch backend data' });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend running on port ${PORT}`);
});
