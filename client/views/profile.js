var React = require('react'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    List = require('material-ui/lib/lists/list'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Divider = require('material-ui/lib/divider'),
    Person = require('material-ui/lib/svg-icons/social/person'),
    LockOpen = require('material-ui/lib/svg-icons/action/lock-open'),
    Logout = require('material-ui/lib/svg-icons/action/exit-to-app'),
    PublicIcon = require('material-ui/lib/svg-icons/social/public');
    
var sendRequest = function(url,payload) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST',url);
    xhr.setRequestHeader('authorization', app.accessToken);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(payload));
}

module.exports = React.createClass({
    mixins: [ampersandMixin],
    displayName: 'User profile page',
    
    logout : function() {
        sendRequest('http://efle3r.colloqi.com/api/users/logout',{accessToken: app.accessToken})
        app.user = {};
        app.accessToken = '';
        app.navigate('#login');
    },
    
    resetPassword: function() {
        sendRequest('http://efle3r.colloqi.com/api/users/reset',{email: app.user.email});
        this.logout();
    },
    
    render: function() {
        var profile = <List>
            <ListItem primaryText={app.user.email} leftIcon={<Person />} />
            <ListItem primaryText={'Emp code : '+((app.user.details && app.user.details.code) ? app.user.details.code : '')}
                        secondaryText={'Supervisor : '+((app.user.supervisor && app.user.supervisor.title) ? app.user.supervisor.title : '')} leftIcon={<PublicIcon />} />
            <ListItem primaryText="Reset password" onTouchTap={this.resetPassword} leftIcon={<LockOpen />}/>
            <ListItem primaryText="Log out" onTouchTap={this.logout} leftIcon={<Logout />}/>
        </List>
        
        return profile;
    }
})