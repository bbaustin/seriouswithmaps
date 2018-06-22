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
      console.log(err);
    });
  })



HomeController.route('/?') 
  .get(function(req, res, next) {
    res.render('home')
    console.log('home get')
  })
  .post(function(req, res, next) {
    Location.create({
      loc: [{lat: 80, lng: 80}],
      userId: 'new test',
      goodOr: true
    })
  });

 

module.exports = HomeController;
