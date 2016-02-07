// Group Model - group.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
    urlRoot: "http://efle3r.colloqi.com:80/api/groups",
    ajaxConfig: function() {
        return {
            headers : {
                'authorization' : app.accessToken
            },
            xhrFields : {
                'withCredentials' : true
            }
        }
    }
});