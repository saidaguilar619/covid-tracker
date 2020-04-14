var db = require("../models");

module.exports = function(app) {
  app.get("/api/post", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
      console.log(dbPost);
    });
  });

  app.post("/api/post", function(req, res) {
    console.log(req.body.name);
    db.Post.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      services: req.body.services
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
