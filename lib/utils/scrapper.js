'use strict';
const puppeteer = require('puppeteer');
const responderHelper = require('./responder-helper');
const logger = require('../logger');

async function scrapper(provider, query, callbackURL, searchID) {
    //PROVIDER'S SPECIFIC SELECTOR, ATTRIBUTED AND URL ARE SAVED AS CONSTANTS
    //THIS COULD BE ENVIRONMENTS OR PERSISTED IN A DB FOR BETTER USE
    const {webSelectors, webAttributes, providerURL} = require('./providersData')[provider];

    try {
        const browser   = await puppeteer.launch({args: ['--no-sandbox']});
        const page = await browser.newPage();
        await page.goto(providerURL);
        await page.waitForSelector(webSelectors.inputSelector);
        await page.click(webSelectors.inputSelector);
        await page.keyboard.type(query);
        await page.keyboard.press('Enter');
        await page.waitForSelector(webSelectors.resultsSelector);

        const productListResults = await page.evaluate((selectors, attributes) => {
            let results = [...document.querySelectorAll(selectors.resultsSelector)];
            let categoryID = document.querySelector(selectors.categorySelector1) || document.querySelector(selectors.categorySelector2);
            if(categoryID) {
                categoryID = categoryID.getAttribute(attributes.title) || '';
            } else {
                categoryID = 'uncategorized';
            }
            let resultsList = results.map((result) => {
                let item = result.querySelector(selectors.itemSelector);
                let SKU = item.getAttribute(attributes.skuAttribute);
                let itemImageURL = item.querySelector(selectors.itemImageSelector) ? item.querySelector(selectors.itemImageSelector).getAttribute(attributes.imgUrl) : '';
                let itemName = item.querySelector(selectors.itemNameSelector).innerHTML;
                let itemPrice = item.querySelector(selectors.itemPriceSelector).innerHTML;

                return {
                    SKU,
                    itemImageURL,
                    itemName,
                    itemPrice,
                    categoryID
                };
            });
            return resultsList;
        }, webSelectors, webAttributes);

        await page.close();
        await browser.close();

        //responderHelper IS CALLED TO SEND THE RESULTS TO THE CALLBACK. COULD BE REPLACED BY A SCHEDULLER
        responderHelper(productListResults, callbackURL, searchID);
        return productListResults;
    } catch(error) {
        logger.error(`error while scrapping website: ${error}`);
        responderHelper(false, callbackURL, searchID);
        return error;
    }
}

// scrapper('https://www.mercadolibre.com.ar/', 'zapatillas');

module.exports = scrapper;
