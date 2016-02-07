// Group Collection - group-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Group = require('Group');


module.exports = AmpCollection.extend({
    model: Group,
    url: '/api/group'
});