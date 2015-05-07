/**
 * Created by john.nana on 3/23/2015.
 */

var cheerio = require('cheerio'),
    rek = require("rekuire"),
    fs= require("fs"),
    DB= rek("database"),
    Q = require("q");
    _ = require("lodash");

//Todo: validate uploads

module.exports = function(){

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var date = new Date();
    var mi;

    var monthIndex = date.getMonth();
    if( monthIndex == 0 ){
        mi = 11
    }
    else{ mi = date.getMonth()-1 ; }

    var billmonth = monthNames[mi];

    //calculate excess
    function excessBill(a){
        var bill = a.bill;
        var max = a.maxbill;
        var xss= 0;
        a.bill = parseInt(bill.split(',').join(''));

        if(a.bill > a.maxbill){
            xss = a.bill - a.maxbill;
            return xss;
        }

        return xss;
    }



    function dbxtract(str){
        var Employee= DB.model("Employee");

        //.select('_id first_name last_name phone email')

        var q = Employee.find({}).exec();
        q.then(function(results){
            var users = _.map(results, function(user){
                return user.toObject();
            }).map(function(user){

                user.month = billmonth;

                var bill = _.find(str,{phone:user.phone});
                if(bill){
                    var invoice = _.merge(bill, user);
                    invoice.excess= excessBill(invoice);
                  return invoice;
                }
                return null
            });
            console.log(users);
            // return users
        });
    }

    fs.readFile("./uploads/phonebill.html",function(err,data){
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
                var number = record.substr(0,9);
                var bill = record.substr(9);
                return{
                    phone:number,
                    bill:bill
                }
            });
        var tmp= str[str.length-1].bill;
        var tmp2= tmp.indexOf('.')+3;
        var  total = tmp.substr(tmp2, tmp.length-1);



        //query the database
       dbxtract(str);
        //console.log(bill);

   });



     // end dbxtract



};















