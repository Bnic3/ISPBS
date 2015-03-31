/**
 * Created by john.nana on 3/19/2015.
 */
var express = require('express');
var router = express.Router();

var done = false;

router.post('/uploadbill', uploadBill);
router.get('/upload', function(req,res){ res.render('uploadTest');});


function uploadBill(res, req){
    if(req.files){
        console.log(req.files);
        res.end("File uploaded.");
    }
}




module.exports= router;