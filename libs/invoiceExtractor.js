/**
 * Created by john.nana on 3/23/2015.
 */

var cheerio = require('cheerio'),
    rek = require("rekuire"),
    fs=require("fs"),
    DB= rek("database"),
    Q = require("q");
    _ = require("lodash");

//Todo: validate uploads

module.exports = function(){





    fs.readFile("./uploads/phonebill.html", function(err, data){
        if (err) res.json({error: true, message: "cant read file"}, 404);


        var html= data.toString();

        // get delimiter
        var a = html.indexOf("Direct number")
        var b = a-7;
        var delimeter = "."+html.slice(b,a-2);
        $ = cheerio.load(html);

        $(delimeter).addClass("ft109").text("x");

        var r = $(".ft109").text();
        var str = r.split('x')
            .filter(function(item){ return item !== "";})
            .map(function(record){
                var number = record.substr(0,9)
                var bill = record.substr(9)
                return{
                    phone:number,
                    bill:bill
                }
            });
        var tmp= str[str.length-1].bill;
        var tmp2= tmp.indexOf('.')+3;
        var  total = tmp.substr(tmp2, tmp.length-1);


        function mapper(a, b) {
            var result = [];
            for (var i = 0; i < a.length; i++) {
                var item = a[i];
                item._doc.bill=" ";
                 item._doc.excess=" ";

                for (var j = 0; j < b.length; j++) {
                    var item2 = b[j];
                    if (item.phone == item2.phone) {
                        for (var prop in item) {
                            if (item2.hasOwnProperty(prop)){
                                item[prop] = item2[prop]
                                /*result.push(item);*/
                            }
                        };
                    }
                }
            }
            return a;
        }// end mapper

        //query the database
        function dbXtract (str){
            var Employee= DB.model("Employee");

            var testArr = [{name: 'John', phone: '012709959', bill:"", create:"123"},
                {name: 'omorefe ', phone: '012709958', bill:"",  create:"456"}];

            //  var collatedArr = mapper(testArr,str);
            //console.log(collatedArr);

            var q = Employee.find({}).exec();
            q.then(function(result){
                var k = mapper(result,str);
                console.log(k)});

            //  Employee.find({}).exec(function(err, collection){

            //console.log(t);

            /*if(collection.length === 0){
             Employee.create({first_name:"John", last_name: "Nana", phone: "012709959", unit: "Internal IT", max: 5000,email: "john.nana@ng.is.co.za" });
             Employee.create({first_name:"Tope", last_name: "Busari", phone: "012709910", unit: "Cloud", max: 5000,email: "tope.busari@ng.is.co.za" });
             Employee.find({}).exec(function(err, data){
             if(err) console.log({message:"employee seeding error"});
             return data;
             });
             }*/
            // var testArr = collection;
            /*var testArr = [{name: 'John', phone: '012709959', bill:"", create:"123"},
             {name: 'omorefe ', phone: '012709958', bill:"",  create:"456"}];

             var collatedArr = mapper(testArr,str);
             console.log(collatedArr);*/
            //  });


        } // end dbxtract


        dbXtract(str);


    });



}
