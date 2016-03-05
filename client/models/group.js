// Group Model - group.js
var AmpModel = require('ampersand-model');
var app = require('ampersand-app');


var groupModel = AmpModel.extend({
    urlRoot: "http://localhost:4000/api/groups",
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
        'subject': 'string'
    }
});

module.exports = groupModel;