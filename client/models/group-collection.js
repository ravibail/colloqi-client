// Group Collection - group-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Group = require('./group');


var groupCollection = AmpCollection.extend({
    model: Group,
});

module.exports = groupCollection;