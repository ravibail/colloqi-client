var AmpersandModel = require('ampersand-model'),
    app = require('ampersand-app');

module.exports = AmpersandModel.extend({
    urlRoot: "http://efle3r.colloqi.com:80/api/users",
    ajaxConfig: function() {
        return {
            headers : {
                'Access-Token' : app.accessToken
            },
            xhrFields : {
                'withCredentials' : true
            }
        }
    }
});