var express = require("express");
var exe = require("./../connection");
var route = express.Router();

/* =====================
   DEFAULT & LOGIN
===================== */

route.get("/", function (req, res) {
  res.redirect("/admin/login");
});

route.get("/login", function (req, res) {
  res.render("admin/login.ejs");
});

route.post("/login_process", function (req, res) {
  var { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    res.render("admin/home.ejs");
  } else {
    res.send("LOGIN FAILED");
  }
});

/* =====================
   SERVICES LIST
===================== */

route.get("/services", async function (req, res) {
  var result = await exe("SELECT * FROM services");
  res.render("admin/services.ejs", { services: result });
});

/* =====================
   SAVE SERVICE
===================== */

route.post("/save_services", async function (req, res) {

  var { service_name, category, base_price, price_type, status } = req.body;

  await exe(
    `INSERT INTO services
     (service_name, category, base_price, price_type, status)
     VALUES (?, ?, ?, ?, ?)`,
    [service_name, category, base_price, price_type, status]
  );

  res.redirect("/admin/services");
});

/* =====================
   EDIT SERVICE PAGE
===================== */

route.get("/edit_service/:id", async function (req, res) {

  var id = req.params.id;

  var result = await exe(
    "SELECT * FROM services WHERE id = ?",
    [id]
  );

  if (result.length === 0) {
    return res.send("Service not found");
  }

  res.render("admin/edit_service.ejs", {
    service: result[0]
  });
});

/* =====================
   UPDATE SERVICE
===================== */

route.post("/update_service/:id", async function (req, res) {

  var id = req.params.id;
  var { service_name, category, base_price, price_type, status } = req.body;

  await exe(
    `UPDATE services SET
      service_name=?,
      category=?,
      base_price=?,
      price_type=?,
      status=?
     WHERE id=?`,
    [service_name, category, base_price, price_type, status, id]
  );

  res.redirect("/admin/services");
});

/* =====================
   DELETE SERVICE
===================== */

route.post("/delete_service/:id", async function (req, res) {

  await exe(
    "DELETE FROM services WHERE id = ?",
    [req.params.id]
  );

  res.redirect("/admin/services");
});

/* =====================
   PACKAGES LIST
===================== */

route.get("/packages", async function (req, res) {

  var result = await exe("SELECT * FROM packages");
  res.render("admin/Packages.ejs", { Packages: result });
});

/* =====================
   SAVE PACKAGE
===================== */

route.post("/save_package", async function (req, res) {

  var { package_name, service_category, price, status } = req.body;

  await exe(
    `INSERT INTO packages
     (package_name, service_category, price, status)
     VALUES (?, ?, ?, ?)`,
    [package_name, service_category, price, status]
  );

  res.redirect("/admin/packages");
});

/* =====================
   DELETE PACKAGE
===================== */

route.get("/delete_package/:id", async function (req, res) {

  await exe(
    "DELETE FROM packages WHERE id = ?",
    [req.params.id]
  );

  res.redirect("/admin/packages");
});

/* =====================
   EDIT PACKAGE PAGE
===================== */

route.get("/edit_package/:id", async function (req, res) {

  var id = req.params.id;

  var result = await exe(
    "SELECT * FROM packages WHERE id = ?",
    [id]
  );

  if (result.length === 0) {
    return res.send("Package not found");
  }

  res.render("admin/edit_package.ejs", {
    package: result[0]
  });
});

/* =====================
   UPDATE PACKAGE
===================== */

route.post("/update_package/:id", async function (req, res) {

  var id = req.params.id;
  var { package_name, service_category, price, short_description, status } = req.body;

  await exe(
    `UPDATE packages SET
      package_name = ?,
      service_category = ?,
      price = ?,
      short_description = ?,
      status = ?
     WHERE id = ?`,
    [package_name, service_category, price, short_description, status, id]
  );

  res.redirect("/admin/packages");
});



/* =====================
   BOOKINGS SAVE
===================== */

route.post("/save_book", async function (req, res) {

  var { name, email, phone, event_type, event_date, message } = req.body;

  await exe(
    `INSERT INTO booking_requests
     (name, email, phone, event_type, event_date, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, phone, event_type, event_date, message]
  );

  res.redirect("/contact");
});

/* =====================
   BOOKINGS LIST
===================== */

route.get("/Bookings", async function (req, res) {

  var result = await exe("SELECT * FROM booking_requests");
  res.render("admin/bookin.ejs", { bookings: result });
});

/* =====================
   EDIT BOOKING
===================== */

route.get("/edit_booking/:id", async function (req, res) {

  var result = await exe(
    "SELECT * FROM booking_requests WHERE id = ?",
    [req.params.id]
  );

  if (result.length === 0) {
    return res.send("Booking not found");
  }

  res.render("admin/edit_booking.ejs", {
    booking: result[0]
  });
});
/* =====================
   UPDATE BOOKING
===================== */

route.post("/update_booking/:id", async function (req, res) {

  var { name, email, phone, event_type, event_date, message } = req.body;

  await exe(
    `UPDATE booking_requests SET
      name = ?,
      email = ?,
      phone = ?,
      event_type = ?,
      event_date = ?,
      message = ?
     WHERE id = ?`,
    [name, email, phone, event_type, event_date, message, req.params.id]
  );

  res.redirect("/admin/Bookings");
});
/* =====================
   DELETE BOOKING
===================== */

route.get("/delete_booking/:id", async function (req, res) {

  await exe(
    "DELETE FROM booking_requests WHERE id = ?",
    [req.params.id]
  );

  res.redirect("/admin/Bookings");
});


/* =====================
   CATEGORIES LIST
===================== */

route.get("/categories", async function (req, res) {

  var result = await exe("SELECT * FROM categories");
  res.render("admin/categories.ejs", { categories: result });
});

/* =====================
   SAVE CATEGORY
===================== */

route.post("/save_category", async function (req, res) {

  var { name, status } = req.body;

  await exe(
    "INSERT INTO categories (name, status) VALUES (?, ?)",
    [name, status]
  );

  res.redirect("/admin/categories");
});

/* =====================
   EDIT CATEGORY PAGE
===================== */

route.get("/edit_category/:id", async function (req, res) {

  var id = req.params.id;

  var result = await exe(
    "SELECT * FROM categories WHERE id = ?",
    [id]
  );

  if (result.length === 0) {
    return res.send("Category not found");
  }

  res.render("admin/edit_category.ejs", {
    category: result[0]
  });
});
/* =====================
   UPDATE CATEGORY
===================== */

route.post("/update_category/:id", async function (req, res) {

  var id = req.params.id;
  var { name, status } = req.body;

  await exe(
    "UPDATE categories SET name = ?, status = ? WHERE id = ?",
    [name, status, id]
  );

  res.redirect("/admin/categories");
});
/* =====================
   DELETE CATEGORY
===================== */

route.get("/delete_category/:id", async function (req, res) {

  var id = req.params.id;

  await exe(
    "DELETE FROM categories WHERE id = ?",
    [id]
  );

  res.redirect("/admin/categories");
});


module.exports = route;
