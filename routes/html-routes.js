// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.get("/data", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/data.html"));
  });
  app.get("/safe", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/safe.html"));
  });
  app.get("/news", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/news.html"));
  });
  app.get("/giving", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/givingBack.html"));
  });


  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
//   app.get("/members", isAuthenticated, function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/members.html"));
//   });

// };
