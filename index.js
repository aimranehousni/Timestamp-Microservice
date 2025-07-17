// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Basic configuration
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(express.static('public'));

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for timestamp conversion
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;
  
  // Handle empty date parameter - return current time
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }
  
  let dateObj;
  
  // Check if the date is a Unix timestamp (all digits)
  if (/^\d+$/.test(date)) {
    // Convert string to number for Unix timestamp
    dateObj = new Date(parseInt(date));
  } else {
    // Try to parse as date string
    dateObj = new Date(date);
  }
  
  // Check if the date is valid
  if (dateObj.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }
  
  // Return the formatted response
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
