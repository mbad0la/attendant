var express = require('express');
var router = express.Router();
var User = require('.././models/users.js')

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  // create a new user

  User.findOne({roll_number:req.body.roll_number}, function(err,user) {
    if(err) throw err;

    if(!user) {

      var newUser = User({
        name: req.body.name,
        isTeacher: req.body.teacher === 'on'?true:false,
        roll_number: req.body.roll_number
      });

      // save the user
      newUser.save(function(err,user) {
        if (err) throw err;
        if(req.body.teacher === 'on') {
          res.redirect('/teacherview');
        }
        req.body.passedData = {'user':user,'message':'Verified'};
        res.render('student',{'user':user,'message':'Verified'});
      });

    } else {

      if(req.body.teacher === true) {
        res.redirect('/teacherview');
      }

      if(req.body.id === user._id) {
        req.body.passedData = {'user':user,'message':'Verified'};
        res.render('student',{'user':user,'message':'Verified'});
      } else {
        res.render('login',{'user':null,'error':true,'message':'User Already Exists'});
      }
    }
  })

});


/* GET home page. */

router.get('/', function(req, res, next) {
  console.log(req.body)
  res.render('student');
});

router.get('/teacherview', function(req, res, next) {
  res.render('teacherview');
});

router.get('/studentview', function(req, res, next) {
  res.render('studentview');
});

router.get('/teacher', function(req, res, next) {
  res.render('teacher');
});


router.get('/inclass', function(req, res, next) {
  res.render('index');
});


module.exports = router;
