/**
 * Created by john.nana on 3/25/2015.
 */
var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//DB Object
var DB = rek('database');

router.post('/user/create/employee/:fname/:lname/:phone/:unit/:maximum', createEmployee);

function createEmployee(req, res){
    var input = req.params;

    var Employee = DB.model("Employee");
    var e_doc= {first_name: input.fname,
                last_name: input.lname,
                phone: input.phone,
                unit: input.unit,
                maxbill:input.maximum
                };
    var emp = new Employee(e_doc);
        emp.email= emp.first_name+"."+emp.last_name+"@ng.is.co.za";
        emp.save(function(err, doc){
            if(err) res.json({error:true, message:"there was an error saving employee on the database"}) ;
            if (!doc) res.json({error:true, message:"Could not save employee on the database"}) ;

            return res.json(doc);
        });

}


function getAllEmployees(req,res){

    var Employee = DB.model("Employee");
    var q = Employee.find({}).exec();
    q.then(function(results){
        res.json(results);
    });

}





module.exports= router;

