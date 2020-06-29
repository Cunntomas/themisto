'use strict';
const request = require('request-promise');
const logger = require('../logger');

async function responder(results, callbackURL, searchID) {
    try {
        let body;
        if(!results) {
            body = {
                status: 'failed',
                searchJob: searchID
            };
            request({
                uri: callbackURL,
                method: 'POST',
                body,
                json: true
            });
        }

        body = {
            status: 'fulfilled',
            searchJob: searchID,
            results
        };
        request({
            uri: callbackURL,
            method: 'POST',
            body,
            json: true
        });
    } catch(error) {
        logger.error(`error responding search job: ${error}`);
    }
}

module.exports = responder;
