'use strict';
const webSelectors = {
    inputSelector: '.nav-search-input',
    resultsSelector: '#searchResults  li.results-item',
    categorySelector1: '#inner-main > aside > div.breadcrumb > ol li a',
    categorySelector2: '#id_category > dd > h3 > a',
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

const providerURL = 'https://www.mercadolibre.com.ar/';

module.exports = {
    webSelectors,
    webAttributes,
    providerURL
};
