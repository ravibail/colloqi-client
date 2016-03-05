// reports Model - reports.js
var AmpModel = require('ampersand-model');
var app = require('ampersand-app');


var reports = AmpModel.extend({
    urlRoot: "http://localhost:4000/api/Messages",
    ajaxConfig: function() {
        return {
            headers : {
                'authorization' : app.accessToken
            },
            xhrFields : {
                'withCredentials' : true
            }
        }
    },
    props: {
        'sender': 'object',
        'type': 'string',
        'content': 'object',
        'location': 'object',
        'forAll': 'boolean',
        'groupId': 'string',
        'groupSubject': 'string',
        'time': 'object'
    }
});

module.exports = reports;