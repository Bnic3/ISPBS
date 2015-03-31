var mongoose = require("mongoose"),
    mongooseTimestamps = require("mongoose-concrete-timestamps"),
    autoIncrement = require("mongoose-auto-increment"),
    config = require("../config"),
    Grid = require("gridfs-stream");

/*
* about the config module
* ---------------------------
* You can change the config key to point to another environment, currently we support development, test and deploy
* To add more configuration options, edit the database.ini file. Config options are exported to any file and contains a large object
* Holding config data
*
* Some info about enviroments
* --------------------------------
* Deploy points to mongolab
* Development points to your local mongo
* Test is yet to be determined(probably another nodejitsu instance)
*
* Git flow convension
* --------------------------------
* Our convention is that the master branch is a main development branch and should always
* point to your local mongo. All feature branches should be spawn directly from
* master. if there is a feature that need to be deployed to jitsu, you should merge that
* feature branch to master and and then switch the the deploy branch then do a git pull from
* master to update your deploy branch, the deploy branch is where we take off into production
*
* Note: always use "git status" to check your current branch to make sure you are working on the correct branch
*
* */

 mongoose.connect( config.database['development'].url + "" + config.database['development'].name );
var db = mongoose.connection;
db.on("error",function(errMsg){
    console.log("Error Connecting to Mongo: " + errMsg);
});
mongoose.set('debug', true);

mongoose.plugin(mongooseTimestamps);
autoIncrement.initialize(db);
module.exports = mongoose;