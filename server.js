const express = require("express");
const app = express();

// Enable CORS
const cors = require("cors");
app.use(cors());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;

  // If date parameter is missing, use current date
  let date;
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the input is a unix timestamp in milliseconds
    if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Valid date
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
