var db = require("../models");
const axios = require("axios");

module.exports = function(app) {
  app.get("/api/post", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.post("/api/post", function(req, res) {
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

  app.delete("/api/post/:id", function(req, res) {
    console.log(req.params.id);
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.put("/api/post", function(req, res) {
    db.Post.update({
      name: req.body.name,
      email:req.body.email,
      location: req.body.location,
      services: req.body.services
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/coronadata", function (req, res) {
    axios({
      "method":"GET",
      "url":"https://corona-virus-world-and-india-data.p.rapidapi.com/api",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"corona-virus-world-and-india-data.p.rapidapi.com",
      "x-rapidapi-key":"78e78b1e9fmsh6fd1cf2f24ca407p189571jsn95e2b6eea953"
      }
      })
      .then((response)=>{
        res.json(response.data);
      })
      .catch((error)=>{
        // console.log(error)
      })
  });
  app.get("/api/getflags", function (req, res) {
    axios({
      "method":"GET",
      "url":"https://restcountries.eu/rest/v2"
      })
      .then((response)=>{
        res.json(response.data);
      })
      .catch((error)=>{
        console.log(error);
      })
  });
};
