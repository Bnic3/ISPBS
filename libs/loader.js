/*
 *
 * This file dynamically loads all the route files in thbe route folder
 * and handle route errors too
 *
 *
 * */

var fs = require("fs");
var path = require("path");
var _ = require("lodash");

/*
 *
 *  Loop through the files requiring everything in its path,
 *  if it meets a folder, recurse the method again
 *
 * */

var readDir = function (routerPath, modelPath, app) {
    /*
     *
     * Based on filenames, get existing route-level middlewares and dynamically load it
     *
     * */
    if (fs.existsSync(routerPath)) {
        fs.readdirSync(routerPath).forEach(function (file) {
            var filePath = path.join(routerPath, file);
            if (filePath.match(/\.js$/)) {
                var route = require("../" + filePath);
                app.use(route);
            }
            if (fs.lstatSync(filePath).isDirectory()) {
                return readDir(filePath, modelPath, app)
            }
        })
    }


    /*
    *
    *
    * Load models too
    *
    * */

     if (fs.existsSync(modelPath)) {
        fs.readdirSync(modelPath).forEach(function (file) {
            var filePath = path.join(modelPath, file);
            if (filePath.match(/\.js$/)) {
                require("../" + filePath);
            }
        })
    }


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


};



module.exports = readDir.bind(null, "routes", "models");

