var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("here!");
  res.render('index', { title: 'Express', layout:"layout"}); //layout:"layout" is the default, but you can choose an alternative layout
  //https://stackoverflow.com/questions/26871522/how-to-change-default-layout-in-express-using-handlebars
});

module.exports = router;
