// reports Collection - reports-collection.js
var AmpCollection = require('ampersand-rest-collection');
var reports = require('./reports');

module.exports = AmpCollection.extend({
    model: reports
});