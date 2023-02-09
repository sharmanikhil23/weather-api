const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const dotEnv = require("dotenv");
const getLocation = require("./src/location");
const getWeather = require("./src/weather");
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  if (req.query.location == undefined) {
    res.send({ error: "Please Provide the location" });
  } else {
    getLocation(req.query.location, (error, data) => {
      if (error !== undefined) {
        res.status(404).json(error);
      } else {
        getWeather(data, (error, data) => {
          if (error !== undefined) {
            res.status(404).json(error);
          } else {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
              "Access-Control-Allow-Methods",
              "GET, POST, OPTIONS, PUT, PATCH, DELETE"
            ); // If needed
            res.setHeader(
              "Access-Control-Allow-Headers",
              "X-Requested-With,content-type"
            ); // If needed
            res.setHeader("Access-Control-Allow-Credentials", true);
            res.status(200).type("json").send(data);
          }
        });
      }
    });
  }
});
app.get("/ip", (req, res) => {
  req.headers["x-forwarded-for"];
  console.log(req.socket.remoteAddress);
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`App Started At Port 3000`);
});
