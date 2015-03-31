/**
 * Created by john.nana on 3/24/2015.
 */
var rekuire = require("rekuire"),
mongoose = rekuire("database"),
    Schema = mongoose.Schema,
    autoIncrement = require("mongoose-auto-increment");

var Employee = new Schema({
    eId: Number,
    first_name: String,
    last_name: String,
    email: {type: String, index: {unique: true}},
    phone: String,
    unit: String,
    max:Number

});



Employee.plugin(autoIncrement.plugin, {model: 'Employee', field: 'eId', startAt: 1000});

module.exports = mongoose.model('Employee', Employee);

