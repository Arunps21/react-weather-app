const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const cityName = req.query.cityName;

  if (!cityName) {
    res.status(400).send("City name required");
  } else {
    try {
      const weatherDisplay = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=199d47abe256277c0c9ff99a838a2c02&units=metric`
      );
      res.json(weatherDisplay.data);
    } catch (err) {
      res.status(500).json({ error: "Error fetching weather data" });
    }
  }
});

app.listen(9000, () => {
  console.log("Server running on port 9000 http://localhost:9000");
});
