// Home Controller
var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    Location        = require(__dirname + '/../models/location'),
    bcrypt          = require('bcrypt'),
    session         = require('express-session');
       

HomeController.route('/getAll')
  .get(function(req, res, next) {
    Location.find(function(err, locations) {
      res.json(locations);
    });
  })


HomeController.route('/?') 
  .get(function(req, res, next) {
    res.render('home')
  })
  .post(function(req, res, next) {
    if (req.body.goodOr === "yes") {
      Location.create({
        loc: [{lat: req.body.lat1, lng: req.body.long1}],
        userId: req.body.goodOr, //this works. because it's a form? 
        goodOr: true
      })
    }
    else {
      Location.create({
        loc: [{lat: req.body.lat1, lng: req.body.long1}],
        userId: req.body.goodOr, //this works. because it's a form? 
        goodOr: false
      })
    } 
  });

 

module.exports = HomeController;
