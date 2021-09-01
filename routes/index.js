var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HackBCA 20XX', 
                        layout:"layout", 
                        style: "index"
                      }); //layout:"layout" is the default, but you can choose an alternative layout
  //https://stackoverflow.com/questions/26871522/how-to-change-default-layout-in-express-using-handlebars
});

module.exports = router;
