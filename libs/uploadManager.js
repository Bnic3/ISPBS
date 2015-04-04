/**
 * Created by john.nana on 3/19/2015.
 */
var done = false;
var rek = require("rekuire");
var xtractor = rek("invoiceExtractor");


var  uploadParams = {
    dest: './uploads',
    rename: function (fieldname, filename) { return "phonebill"; },
    onFileUploadStart: function (file) {console.log(file.originalname + ' is starting ...'); },
    onFileUploadComplete: function (file,req,res) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        //next();
       //res.redirect('/xtract');
        xtractor();
        done=true;
    }
};

module.exports= {status: done, parameter: uploadParams};