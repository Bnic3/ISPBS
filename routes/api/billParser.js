/**
 * Created by john.nana on 3/19/2015.
 */
var express = require('express');
var multer = require("multer");
var rek = require("rekuire");
var uploadParams= rek('uploadManager');
var xtractor = rek("invoiceExtractor");

var nodemailer = require('nodemailer');

var utility = rek("utility");



var router = express.Router();

var done = false;

router.post('/uploadbill',multer({
    dest: './uploads/',
    rename: function (fieldname, filename) { return "phonebill"; },
    onFileUploadComplete: function (file,req,res) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);

     }}),utility.billParser,utility.dbxtractMapper, uploadBill);

router.get('/upload', function(req,res){ res.render('uploadTest');});




function uploadBill(req,res){
    if(req.files){
        console.log("multer as a middleware worked")
        var answer= req.xtract.users;
        res.json(answer);

    }
}











module.exports= router;