var React = require('react'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    Paper = require('material-ui/lib/paper'),
    List = require('material-ui/lib/lists/list'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Divider = require('material-ui/lib/divider'),
    TextField = require('material-ui/lib/text-field'),
    Button = require('material-ui/lib/raised-button'),
    _ = require('lodash');
    
var Users = require('../models/person'),
    Groups = require('../models/group'),
    eflData = require('../efl-e3r/efl-e3r');
    
module.exports = React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Directory',
    
    getInitialState : function() {
        return {email: '', password: '',message: ''}
    },
    
    emailChanged : function(event) {
        this.setState({email: event.target.value});
    },
    
    passwordChanged : function(event) {
        this.setState({password: event.target.value});
    },
    
    login: function() {
        var self = this;
        if (!this.state.email || !this.state.password || !this.state.email.match(/.*@.*/)) {
            self.setState({message: 'Invalid Email or password'});
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost:4000/api/users/login?include=user&rememberMe=true");
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.response);
                app.accessToken = response.id;
                app.user = response.user;
                var person = new Users().fetch();
                person.onload = function() {
                    app.directory = JSON.parse(person.response);
                }
                var group = new Groups().fetch({success: function(collection,response,options) {
                    app.group = _.find(response, function(o) { return (o.subject == 'dar');});
                }, error: function(err) {
                    console.log(err);
                }});
                eflData.getAllReports();
                app.navigate("");
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                self.setState({message: 'Login failed!'});
            }
        }
        
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({email: this.state.email, password: this.state.password}));
    },
    
    render: function() {
        var form = <List>
            <ListItem >
                <TextField floatingLabelText="Email ID" type="email" hintText='Please enter your email-id' fullWidth={true} value={this.state.email} onChange={this.emailChanged}/>
            </ListItem>
            <Divider />
            <ListItem >
                <TextField floatingLabelText="Password" type="password" hintText='Please enter your password' fullWidth={true} value={this.state.password} onChange={this.passwordChanged}/>
            </ListItem>
            <Button label='Log in' secondary={true} fullWidth={true} onTouchTap={this.login}/>
            <ListItem primaryText={this.state.message} />
        </List>
        
        return form;
    }
})