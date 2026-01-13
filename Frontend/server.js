const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const FLASK_API_URL = process.env.FLASK_API_URL || 'http://localhost:5000';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Proxy endpoint to Flask backend
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get(`${FLASK_API_URL}/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to Flask backend' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'express-frontend' });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Frontend</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; }
        .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
        .success { background: #d4edda; color: #155724; }
        button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background: #0056b3; }
        #result { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Express Frontend Application</h1>
        <p>This is the Express frontend running on port ${PORT}</p>
        <button onclick="fetchData()">Fetch Data from Flask Backend</button>
        <div id="result"></div>
      </div>
      <script>
        async function fetchData() {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = 'Loading...';
          try {
            const response = await fetch('/api/data');
            const data = await response.json();
            resultDiv.innerHTML = '<div class="status success">' + JSON.stringify(data, null, 2) + '</div>';
          } catch (error) {
            resultDiv.innerHTML = '<div class="status error">Error: ' + error.message + '</div>';
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Express server running on port ${PORT}`);
  console.log(`Flask API URL: ${FLASK_API_URL}`);
});
