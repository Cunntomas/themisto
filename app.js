'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./lib/routes');
const logger = require('./lib/logger');

function initialize() {
    app.use(bodyParser.json());

    //ROUTES ARE CREATED USING THE NAME OF THE FILE AND THE NAME OF THE ROUTE WITH THE FORMAT
    // /api/name_of_route_file/name_of_route
    Object.keys(routes).forEach((key) => {
        app.use(`/api/${key}`, routes[key]);
    });
    
    app.use(function(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        logger.error('handleError: ', err);
        if (res.headersSent) {
            return next(err);
        }
        let error = {};
        error.status = err.status;
        if (req.app.get('env') === 'development') {
            error.message = err.message;
            error.stack = err.stack;
        }
        return res.status(err.status || 500).json({
            error
        });
    });

    return app;
}

module.exports = {
    initialize
};
