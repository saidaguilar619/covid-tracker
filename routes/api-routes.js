var db = require("../models");
const axios = require("axios");

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
      location: req.body.location,
      services: req.body.services
    }).then(function(dbPost) {
      res.json(dbPost);
    });

    
  }
  
  );
  app.get("/api/coronadata", function (req, res) {
    axios
      .get("https://corona-virus-world-and-india-data.p.rapidapi.com/api?x-rapidapi-key=f112b9267amshffba7ba252f8ed4p166504jsnecb0af3ef299")
      .then(function (data) {
        console.log(data.data);
        res.json(data.data);
      }).catch(function(err){
        console.log(err);
      });
  });
};
