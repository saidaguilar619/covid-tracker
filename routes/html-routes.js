// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
module.exports = function(app) {
  app.get("/", function(req, res) {
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
};
