var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var cookieParser = require('cookie-parser');
var passport = require("passport");
var multer = require('multer');

var rek = require("rekuire");
var uploadParams= rek('uploadManager');
var done = uploadParams.status;

var bodyParser = require('body-parser');

/*var routes = require('./routes/index');
var users = require('./routes/users');*/

//libs
var mongoose = require("./libs/database");
var loader = require("./libs/loader");
var authentication = require("./libs/authentication");
//var auth = require("./libs/authentication");

//circular reference
var app = module.exports = express();

var sessionStore;
mongoose.connection.once("open", function(err){
    if(err) throw err;
    sessionStore = new MongoStore({mongoose_connection:mongoose.connection});
});

//var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure multer
app.use(multer(uploadParams.parameter));

app.use(session({
    secret: "somelongassname",
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());



app.use(require('./routes/index.js'));

/*app.use('/', routes);
app.use('/users', users);*/

authentication(app);
loader(app);











module.exports = app;
