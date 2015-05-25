var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('landing2', { title: 'Express' });
});

router.get('/loginsuccess', function(req,res){

    console.log(req.user);
    res.render('page/main');
});

/*router.get('/partial/:partialname', function(req,res){
    res.render('partial/partial-'+ req.params.partialname);

});*/


//login page
/*
router.get('/account/login',function(req, res){
    res.render("pages/login", {page:'login',message:req.flash('error')});
});
*/

//Authenticate



router.post('/login',passport.authenticate('local', { successRedirect: '/loginsuccess',
    failureRedirect: '/',
    failureFlash: true }));





module.exports = router;
