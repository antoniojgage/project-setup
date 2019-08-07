const router = require('express').Router();
var db = require('../../models');
// get route -> index
router.get('/locations/:latitude?/:longitude?', function(req, res) {
  console.log('Get route hit /locations', req.params);

  if (req.params.latitude) {
    console.log('Latitude was found, running single get query');
    db.Location.findAll({
      where: {
        latitude: req.params.latitude,
        longitude: req.params.longitude,
      },
    }).then(results => {
      console.log(results);
      res.send(results);
    });
  } else {
    db.Location.findAll({}).then(results => {
      res.send(results);
      console.log('GET HIT');
    });
  }
});

router.post('/tags', function(req, res) {
  console.log('Tag route hit');
  //connected to the db haters
  db.Location.findAll({
    where: {
      tags: req.body.tags,
    },
  }).then(results => {
    res.send(results);
  });
});

// and this is for creat})ing? and yes
router.post('/locations', (req, res) => {
  console.log('Post route hit /locations', req.body);

  db.Location.count({
    where: {
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
  }).then(count => {
    if (count > 0) {
      // dont do anything because record is already in DB
    } else {
      db.Location.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }).then(results => {
        res.send(results);
      });
    }
  });
});

// so this is for updating? yes
router.put('/locations', (req, res) => {
  console.log('Put route hit with:', req.body, req.params);
  console.log(req.body.category);
  var latitude = parseFloat(req.body.latitude).toFixed(5);
  var longitude = parseFloat(req.body.longitude).toFixed(5);
  db.Location.findOne({
    where: { latitude: latitude, longitude: longitude },
  }).then(location => {
    if (location) {
      location
        .update({
          tag: req.body.tag,
          category: req.body.category,
        })
        .then(result => {
          console.log('Successful update');
          res.send(result);
        })
        .catch(err => console.log('this failed to update'));
    } else {
      console.log('we are not finding any location');
    }
  });
});

module.exports = router;
