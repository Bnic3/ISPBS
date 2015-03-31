var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});



//login page
router.get('/account/login',function(req, res){
    res.render("pages/login", {page:'login',message:req.flash('error')});
});

//Authenticate



router.post('/login',passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/error',
    failureFlash: true }));





module.exports = router;
