'use strict';
const puppeteer = require('puppeteer');


async function scrapper(provider, query) {
    const webSelectors = {
        inputSelector: '.nav-search-input',
        resultsSelector: '#searchResults  li.results-item',
        categorySelector: '#id_category > dd > h3 > a',
        itemSelector: 'div.rowItem.item',
        itemImageSelector: 'a.item-image > img',
        itemNameSelector: 'span.main-title',
        itemPriceSelector: 'span.price__fraction'
    };

    const webAttributes = {
        title: 'title',
        skuAttribute: 'id',
        imgUrl: 'data-src'
    };
    try {
        const browser   = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(provider);
        await page.waitForSelector(webSelectors.inputSelector);
        await page.click(webSelectors.inputSelector);
        await page.keyboard.type(query);
        await page.keyboard.press('Enter');
        await page.waitForSelector(webSelectors.resultsSelector);

        const productListResults = await page.evaluate((selectors, attributes) => {
            let results = [...document.querySelectorAll(selectors.resultsSelector)];
            let categoryID = document.querySelector(selectors.categorySelector).getAttribute(attributes.title);
            let resultsList = results.map((result) => {
                let item = result.querySelector(selectors.itemSelector);
                let SKU = item.getAttribute(attributes.skuAttribute);
                let itemImageURL = item.querySelector(selectors.itemImageSelector).getAttribute(attributes.imgUrl);
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

        console.log(productListResults);
        await page.close();
        await browser.close();
        return productListResults;
    } catch(error) {
        console.log(error);
        return error;
    }
}

scrapper('https://www.mercadolibre.com.ar/', 'joystick');

// modules.export = scrapper;
