var app = require('ampersand-app');
var PageView = require('./base');
var templates = require('../templates');
var LoginForm = require('../forms/login');
var Users = require('../models/person');


module.exports = PageView.extend({
    pageTitle: 'Login',
    template: templates.pages.login,
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new LoginForm({
                    el: el,
                    submitCallback: function (data) {
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST","http://efle3r.colloqi.com:80/api/users/login?include=user&rememberMe=true");
                        
                        xhr.onreadystatechange = function() {
                            if (xhr.readyState == 4 && xhr.status == 200) {
                                var response = JSON.parse(xhr.response);
                                app.accessToken = response.id;
                                app.user = response.user;
                                var person = new Users().fetch();
                                person.onload = function() {
                                    app.directory = JSON.parse(person.response);
                                }
                                app.navigate("");
                            }
                        }
                        
                        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        xhr.send(JSON.stringify({email: data.email, password: data.password}));
                    }
                });
            }
        }
    }
});
