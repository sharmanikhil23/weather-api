const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const dotEnv = require("dotenv");
const getLocation = require("./src/location");
const getWeather = require("./src/weather");
const cors = require("cors");

app.use(cors({ origin: `*` }));

app.get("/", (req, res) => {
  if (req.query.location == undefined) {
    res.send({ error: "Please Provide the location" });
  } else {
    getLocation(req.query.location, (error, data) => {
      if (error !== undefined) {
        return res.status(404).json(error);
      } else {
        getWeather(data, (error, result) => {
          if (error != undefined) {
            return res.status(404).json(error);
          } else {
            res.status(200).type("json").send(result);
          }
        });
      }
    });
  }
});

app.listen(port, () => {
  console.log(`App Started At Port` + port);
});
