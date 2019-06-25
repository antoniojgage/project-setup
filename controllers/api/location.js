const router = require('express').Router();
var db = require('../../models');
// get route -> index
router.get('/locations', function(req, res) {
  console.log('Sup');
  //connected to the db haters
  db.Location.findAll({}).then(function(results) {
    res.json(results);
  });
  //do things here for other routes
});

router.post('/locations', function(req, res) {
  console.log('Sup2');
  console.log(req.body);

  db.Location.create({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  }).then(function(results) {
    res.send(results);
  });
});

router.put('/locations', function(req, res) {
  console.log('is this working');
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
    },
  ).then(function(results) {
    res.send(results);
  });
});

module.exports = router;
