// Categories Collection - categories-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Categories = require('Categories');


var categoriesColection = AmpCollection.extend({
    model: Categories,
    url: '/api/categories'
});

module.exports = categoriesCollection;