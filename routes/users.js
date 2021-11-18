var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('loginform', {
    register: false
  });
});

router.post('/login', function(req, res, next) {
  console.log("LOGIN:" + JSON.stringify(req.body));
  res.redirect("/");
});


router.get('/register', function(req, res, next) {
  res.render('loginform', {
    register: true
  });
});

router.post('/register', function(req, res, next) {
  console.log("REGISTER:" + JSON.stringify(req.body));
  res.redirect("/");
});

module.exports = router;
