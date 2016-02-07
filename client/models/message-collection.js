// Message Collection - message-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Message = require('Message');


module.exports = AmpCollection.extend({
    model: Message,
    url: '/api/message'
});