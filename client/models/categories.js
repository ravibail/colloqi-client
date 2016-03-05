// Categories Model - categories.js
var AmpModel = require('ampersand-model');


module.exports = AmpModel.extend({
    urlRoot: "http://localhost:4000/api/categories",
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