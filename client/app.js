var app = require('ampersand-app');
var _ = require('lodash');
var config = require('clientconfig');
var Router = require('./router');
var Layout = require('./views/layout');
var MainView = require('./views/main');
var Me = require('./models/me');
var Groups = require('./models/group');
var Messages = require('./models/message');
var Users = require('./models/person');
var domReady = require('domready');
var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');

// attach our app to `window` so we can
// easily access it from the console.
window.app = app;

injectTapEventPlugin();

if ('serviceWorker' in navigator) {
    //Register service worker
    navigator.serviceWorker.register('/service-workers/service-worker-main.js').then(function(registration) {
        console.log('Service worker registered with scope: ',registration.scope);
    }).catch(function(err) {
        console.log('Registeration error: ',err);
    })
}

// Extends our main app singleton
app.extend({
    router: new Router(),
    state: {},
    groups: [],
    user : {},
    directory: [],
    // This is where it all starts
    init: function() {
        // Create and attach our main view
        this.mainView = new MainView({
            el: document.body
        });
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://efle3r.colloqi.com:80/api/users/login?include=user");
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.response);
                app.accessToken = response.id;
                this.user = response.user;
                var groups = new Groups().fetch();
                groups.onload = function() {
                    app.groups = JSON.parse(groups.response);
                }
                var person = new Users().fetch();
                person.onload = function() {
                    app.directory = JSON.parse(person.response);
                }
            }
        }
        
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({email:"", password:""}));

        // this kicks off our backbutton tracking (browser history)
        // and will cause the first matching handler in the router
        // to fire.
        this.router.history.start({ pushState: true });
    },
    // This is a helper for navigating around the app.
    // this gets called by a global click handler that handles
    // all the <a> tags in the app.
    // it expects a url pathname for example: "/costello/settings"
    navigate: function(page) {
        var url = (page.charAt(0) === '/') ? page.slice(1) : page;
        this.router.history.navigate(url, {
            trigger: true
        });
    }
});

// run it on domReady
domReady(_.bind(app.init, app));
