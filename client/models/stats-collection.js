// Stats Collection - stats-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Stats = require('Stats');


statsCollection = AmpCollection.extend({
    model: Stats,
    url: '/api/stats'
});

module.exports = statsCollection;