// Home Controller
var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    Location        = require(__dirname + '/../models/location'),
    // bcrypt          = require('bcrypt'),
    session         = require('express-session');
       

HomeController.route('/getAll')
  .get(function(req, res, next) {
    Location.find(function(err, locations) {
      res.json(locations);
    });
  })


/* DELETE /tasks/:id        
// working! was throwing an error, because you were res.json'ing, then trying to render a page (or vice versa). This allows ANY USER to type in an ID (which is ostensibly hidden?) in the URL and delete that in the DB.  */
// getting a favico error 
HomeController.route('/:id') 
  .get(function(req, res, next) {
    console.log(req.params.id);
    Location.findByIdAndRemove(req.params.id, function (err, task) {
      console.log(req.params.id);
      if (err) return next(err);
      res.json(task);
    });
  });


HomeController.route('/?') 
  .get(function(req, res, next) {
    res.render('home', {
      message: 'PLACE A PARKING SPOT'
    })
  })
  .post(function(req, res, next) {
      if ((req.body.goodOr === '')) {
        res.render('home', {
          message: 'Please choose yes or no'
        })
        console.log('req.body.goodOr === empty');
        // res.render('signup', {
        //   message: !boss ? 'Please complete all fields!' : false
        // });
      }
      else {
        Location.create({
          loc: [{lat: req.body.lat1, lng: req.body.long1}],
          userId: 'Not Set!', 
          goodOr: req.body.goodOr,
          ticket: req.body.ticket,
          stolen: req.body.stolen
        })
      }
    // }
    // else {
    //   Location.create({
    //     loc: [{lat: req.body.lat1, lng: req.body.long1}],
    //     userId: req.body.goodOr, 
    //     goodOr: false
    //   })
    // } 
  });

 

module.exports = HomeController;
