const router = require("express").Router();
var db = require("../../models");
// get route -> index
router.get("/locations", function(req, res) {
  console.log("Sup");
  //connected to the db haters
  db.Location.findAll({}).then(function(results) {
    res.json(results);
  });
  //do things here for other routes
});

// and this is for creating? and yes
router.post("/locations", function(req, res) {
  console.log("Sup2");
  console.log(req.body);

  db.Location.count({ where: {latitude: req.body.latitude, longitude: req.body.longitude} }).then(count => {
    if (count > 0) {
      // dont do anything because record is already in DB
    } else {
      db.Location.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }).then(function(results) {
        res.send(results);
      });
    }
  });  
});

// so this is for updating? yes
router.put("/locations", function(req, res) {
  console.log("is this working");
  console.log(req.body);

  db.Location.update(
    {
      tag: req.body.tag,
    },
    {
      where: {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },
    }).then(function(results) {
    res.send(results);
  });
});

module.exports = router;
