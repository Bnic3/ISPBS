/**
 * Created by larry Eliemenye
 */
var ini = require("ini"),
    fs = require("fs"),
    path = require("path")
    config = {}

var files = fs.readdirSync(__dirname);
files.filter(function(file){
    return file != "index.js"
}).forEach(function(file){
    var base = path.basename(file, ".ini");
    config[base] = ini.parse(fs.readFileSync(__dirname + "/" + file, 'utf-8'));
});
module.exports = config;
