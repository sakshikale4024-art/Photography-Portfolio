var express = require("express");
var exe = require('./../connection');

var route = express.Router();

// Home
route.get("/", function (req, res) {
  res.render("user/home.ejs");
});

// About
route.get("/about", function (req, res) {
  res.render("user/about.ejs");
});

// Portfolio
route.get("/portfolio", function (req, res) {
  res.render("user/portfolio.ejs");
});

route.get("/album/rohit-pooja", function (req, res) {
  var mainImage = req.query.img;
  res.render("user/album.ejs", { mainImage: mainImage });
});


//service
route.get("/service", function (req, res) {
  res.render("user/service.ejs");
});  


//packeses
route.get("/packages", function (req, res) {
  res.render("user/packages.ejs");
});


//packeses
route.get("/contact", function (req, res) {
  res.render("user/contact.ejs");
});

// route.get("/contact", function (req, res) {
//     res.redirect("user/contact.ejs");
// });
module.exports = route;

