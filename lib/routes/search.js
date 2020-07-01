'use strict';
const express = require('express');
const router = express.Router();
const scrapper = require('../utils/scrapper');
const providers = require('../utils/providersData');

router.post('/', async(req, res) => {
    try {
        const query = req.body.query;
        const provider = req.body.provider;
        const callbackURL = req.body.callbackURL;
        const searchID = req.body.searchID;

        if(!query || !provider || !searchID) {
            return res.status(400).json({error: 'invalid search data'});
        }

        if(!providers[req.body.provider]) {
            return res.status(400).json({error: `invalid provider:${provider}`});
        }
        if(!callbackURL) {
            return res.status(400).json({error: 'a callback URL is required'});
        }

        scrapper(provider, query, callbackURL, searchID);

        return res.status(200).json({result: 'processed', message: 'Search order has been processed'});
    } catch(error) {
        return res.status(500).json({error: 'An error has ocurred'});
    }
});

module.exports = router;
