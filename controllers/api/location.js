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

  var latitude = parseFloat(req.body.latitude).toFixed(5);
  console.log(latitude);
  var longitude= parseFloat(req.body.longitude).toFixed(5);
  // thanks
  db.Location.findOne({ where: {latitude: latitude, longitude: longitude} }).then(location => {
    if(location) {
      location.update({
        tag: req.body.tag
      })
      .then( result =>
        console.log("boom this updated")
      )
      .catch(err =>
        console.log("this failed to update")
      )
    } else {
      console.log("we are not finding any location");
    }
  });


  // db.Location.update(
  //   {
  //     tag: req.body.tag,
  //   },
  //   {
  //     where: {
  //       latitude: req.body.latitude,
  //       longitude: req.body.longitude,
  //     },
  //   }).then(function(results) {
  //   res.send(results);
  // });
});

module.exports = router;
