var app = require('ampersand-app');
var _ = require('lodash');
var config = require('clientconfig');
var Router = require('./router');
var Layout = require('./views/layout');
var MainView = require('./views/main');
var Me = require('./models/me');
var domReady = require('domready');
var injectTapEventPlugin = require('react-tap-event-plugin');

// attach our app to `window` so we can
// easily access it from the console.
window.app = app;

injectTapEventPlugin();

if ('serviceWorker' in navigator) {
    //Register service worker
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('Service worker registered with scope: ',registration.scope);
    }).catch(function(err) {
        console.log('Registeration error: ',err);
    })
}

// Extends our main app singleton
app.extend({
    router: new Router(),
    state: {},
    user : {},
    directory: [],
    // This is where it all starts
    init: function() {
        // Create and attach our main view
        this.mainView = new MainView({
            model: this.me,
            el: document.body
        });
        
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
