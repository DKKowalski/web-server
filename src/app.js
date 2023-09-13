const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3301;
//Define paths fot Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "No location was given!" });
  }

  geoCode(req.query.address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(lat, lon, (error, { forecast, location }) => {
      if (error) {
        return res.send({ error });
      }
      res.send({ forecast, location });
    });
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Amidu Sewuna Kpandana",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Monseiur Me",
    name: "Amidu Sewuna Kpandana",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Amidu Sewuna Kpandana",
  });
});

app.get("*", (req, res) => {
  res.render("404");
});
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
