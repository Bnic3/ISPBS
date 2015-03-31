/**
 * Created by john.nana on 3/24/2015.
 */
var rekuire = require("rekuire")
mongoose = rekuire("database"),
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment");

var Invoice = new Schema({
    phone: String,
    bill: Number,
    month: String,
    year: String,
    Excess: Number
});

module.exports = mongoose.model('Invoice', Invoice);


