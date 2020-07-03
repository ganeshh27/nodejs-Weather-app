const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Ganesh H",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me!!!!!",
    name: "Ganesh H",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page!!!!!",
    helpText: "Just to Help You....!",
    name: "Ganesh H",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provice a location'
    })
  }
  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      } else {
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        })
      }
    })
  })
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Help Page!!!!!",
    errText: "Help Article Not found!",
    name: "Ganesh H",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error!!!!!",
    errText: "404. Page Not Found!",
    name: "Ganesh H",
  });
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});