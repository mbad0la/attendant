var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('student');
});


router.get('/inclass', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
