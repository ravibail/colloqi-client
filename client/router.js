var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var CollectionDemo = require('./pages/collection-demo');
var InfoPage = require('./pages/info');
var PersonAddPage = require('./pages/person-add');
var PersonEditPage = require('./pages/person-edit');
var PersonShowPage = require('./pages/person-show');
var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('./views/components');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'groupView/:id/:subject': 'groupView',
        'directory/': 'directory',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage({
            model: app.me
        }));
    },

    groupView: function (id, subject) {
        app.state = {title : subject};
        ReactDOM.render(<Component.groupView id={id} />, document.getElementById('content'));
    },

    directory: function () {
        app.state = {title: 'Directory'};
        ReactDOM.render(<Component.directory />, document.getElementById('content'));
    },

    personEdit: function (id) {
        app.trigger('page', new PersonEditPage({
            id: id
        }));
    },

    personView: function (id) {
        app.trigger('page', new PersonShowPage({
            id: id
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
