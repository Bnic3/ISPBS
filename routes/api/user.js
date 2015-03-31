/**
 * Created by john.nana on 3/18/2015.
 */
var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//DB Object
var DB = rek('database');

router.post('/user/create/:username/:passwd', createUser);
router.get('/test', function(req,res){res.send("test");});

function createUser(req, res){

    var user = DB.model('User');
    var input = req.params;

    var User = new user({username: input.username});
    var psw = input.passwd;
    User.setPassword(psw);

    User.save(function(err, result) {
        if (err) return res.json(err, 404);
        return res.json(result);
    });




}










module.exports = router;

