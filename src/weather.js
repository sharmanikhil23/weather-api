let dotEnv = require("dotenv");
const path = require("path");

let envLocation = path.format({
  root: __dirname,
  dir: "./env",
  base: ".env",
});

dotEnv = dotEnv.config({ path: envLocation });

const getWeather = ({ latitude, longitude }, callback) => {
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER}&q=${latitude},${longitude}&days=4&aqi=yes&alerts=yes`;

  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      callback(undefined, data);
    });
};

module.exports = getWeather;
