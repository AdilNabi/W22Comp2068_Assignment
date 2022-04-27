var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lab 3' , 
  body: 'This is lab 3 for COMP2068 at Lakehead Georgian'});
});

module.exports = router;
