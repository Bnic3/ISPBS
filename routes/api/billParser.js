/**
 * Created by john.nana on 3/19/2015.
 */
var express = require('express');
var multer = require("multer");
var rek = require("rekuire");
var uploadParams= rek('uploadManager');
var xtractor = rek("invoiceExtractor");



var router = express.Router();

var done = false;

router.post('/uploadbill',uploadBill);

router.get('/upload', function(req,res){ res.render('uploadTest');});


function uploadBill(req,res){
    if(req.files){
        //console.log(req.files);
     //xtractor();
    }
}






module.exports= router;