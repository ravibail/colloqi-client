var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var InfoPage = require('./pages/info');
var Login = require('./views/login');
var React = require('react');
var ReactDOM = require('react-dom');
var Component = require('./views/components');
var Layout = require('./views/layout');
var Profile = require('./views/profile');
var Report = require('./views/report');
var Tree = require('./views/tree');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'groupView/:id/:subject': 'groupView',
        'directory': 'directory',
        'login': 'login',
        'profile': 'profile',
        'engagements': 'engagements',
        'task': 'task',
        'form/:index': 'form',
        'reportees': 'reportees',
        'viewReports/:id/:title': 'viewReports',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        ReactDOM.render(<Layout />,document.body);
        this.redirectTo('engagements')
    },

    groupView: function (id, subject) {
        app.state = {title : subject};
        ReactDOM.render(<Component.groupView id={id} />, document.getElementById('content'));
    },

    directory: function () {
        app.state = {title: 'Directory'};
        ReactDOM.render(<Component.directory />, document.getElementById('content'));
    },
    
    login: function () {
        ReactDOM.render(<Login />, document.body);
    },
    
    profile: function() {
        app.state = {title: app.user.title};
        ReactDOM.render(<Profile />, document.getElementById('content'));
    },
    
    engagements: function() {
        app.state = {title: 'Select an Engagement'};
        ReactDOM.render(<Report.engagements />, document.getElementById('content'));
    },
    
    task: function() {
        app.state = {title: 'Task form'};
        ReactDOM.render(<Report.taskForm />, document.getElementById('content'));
    },
    
    form: function(index) {
        app.state = {title: 'Engagement'};
        ReactDOM.render(<Report.formPage index={index} />,document.getElementById('content'));
    },
    
    reportees: function() {
        app.state = {title: 'Reportees'};
        ReactDOM.render(<Tree />, document.getElementById('content'));
    },
    
    viewReports: function(id, title) {
        app.state= {title: 'Reports of '+ title};
        ReactDOM.render(<Report.display id={id} title={title} />, document.getElementById('content'));
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
        this.redirectTo('engagements');
    }
});
