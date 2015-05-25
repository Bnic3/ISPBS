/**
 * Created by john.nana on 3/16/2015.
 */
var rekuire = require("rekuire"),
    mongoose = rekuire("database"),
    crypto = require("crypto"),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    passwdhash: String,
    salt: { type: String, required: true, default: uuid.v1 }
});

var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
    };

UserSchema.methods.setPassword = function(passwordString) {
    this.passwdhash = hash(passwordString, this.salt);
};
UserSchema.methods.isValidPassword = function(passwordString) {
    var w = hash(passwordString, this.salt);
    //return w;
    return this.passwdhash === hash(passwordString, this.salt);
};






module.exports = mongoose.model('User', UserSchema);
