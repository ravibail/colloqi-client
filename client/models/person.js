var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    urlRoot: "http://efle3r.colloqi.com:80/api/users",
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
