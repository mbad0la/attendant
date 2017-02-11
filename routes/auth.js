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
        res.render('student',{'user':user,'message':'Verified'});
      });

    } else {

      if(req.body.teacher === true) {
        res.redirect('/teacherview');
      }

      if(req.body.id === user._id) {
        res.render('student',{'user':user,'message':'Verified'});
      } else {
        res.render('login',{'user':null,'error':true,'message':'User Already Exists'});
      }
    }
  })

});


module.exports = router;
