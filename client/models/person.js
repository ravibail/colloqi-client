var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    urlRoot: "http://localhost:4000/api/users",
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
