var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('student');
});

router.get('/teacherview', function(req, res, next) {
  res.render('teacherview');
});

router.get('/studentview', function(req, res, next) {
  res.render('studentview');
});

router.get('/inclass', function(req, res, next) {
  res.render('index');
});


module.exports = router;
