let dotEnv = require("dotenv");
const { response } = require("express");
const { resolve } = require("path");
const path = require("path");
const { features } = require("process");
const fetch = require("node-fetch");

let envLocation = path.format({
  root: __dirname,
  dir: "./env",
  base: ".env",
});

dotEnv = dotEnv.config({ path: envLocation });

const getLocation = (location, callback) => {
  let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MAPBOXKEY}`;

  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        callback({ error: "Some issue with location" }, undefined);
      }
    })
    .then((data) => {
      if (data.features.length !== 0) {
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
        });
      } else {
        callback({ error: "Some issue with location" }, undefined);
      }
    });
};

module.exports = getLocation;
