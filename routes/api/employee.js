/**
 * Created by john.nana on 3/25/2015.
 */
var express = require('express');
var router = express.Router();
var rek = require("rekuire");
var _ = require("lodash");

//DB Object
var DB = rek('database');

router
    .route("/api/employee")
    .get(getAllEmployees)
    .post(createEmployee)
    .delete(removeEmployee)
    .put(updateEmployee);


function createEmployee(req, res){
    var input = req.body;

    var Employee = DB.model("Employee");

    var emp = new Employee();
        emp = _.merge(emp, input);
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

function removeEmployee(req,res){
    var Employee = DB.model("Employee");
    var id = mongoose.Types.ObjectId(req.query.id);
    Employee.remove({_id : id}, function(err, User){
        if(err) return res.status(404).json(err);
        return res.json({ error:false, message:"Employee deleted successfully" })
    });

}


function updateEmployee(req, res, next) {
    var Employee = DB.model("Employee");
    var data = req.body;
    Employee.update({ _id:data._id }, data, { upsert:true }, function(err, UpdatedEmployee){
        if(err) return res.status(404).json(err);
        return res.json({ error: false, message:'update successful', payload:UpdatedEmployee });
    });
}

function dummyService(req, res){
    var Employee = DB.model("Employee");
    var input = req.body;
    var emp = new Employee();
    emp = _.merge(emp, input);


    console.log(emp);
    res.json(input);

}





module.exports= router;

