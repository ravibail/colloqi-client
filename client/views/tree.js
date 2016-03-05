var React = require('react'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    Component = require('./components'),
    List = require('material-ui/lib/lists/list'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Divider = require('material-ui/lib/divider');
    
var createTree = function() {
    var reporteesTree = {};
    app.reporteesTree = [];
    app.directory.forEach(function(user) {
        user.items = [];
        reporteesTree[user.id] = user;
    })
    for(var userId in reporteesTree) {
        var user = reporteesTree[userId];
        if (user.supervisor && user.supervisor.dbid && reporteesTree[user.supervisor.dbid]) {
            reporteesTree[user.supervisor.dbid].items.push(user);
        } else
            app.reporteesTree.push(user);
    }
}

module.exports = React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Reportees tree',
    getInitialState: function() {
        if (!app.reporteesTree) {
            createTree();
        }
        return {};
    },
    
    render: function() {
        var nodes = [];
        app.reporteesTree.forEach(function(user) {
            nodes.push(<Component.node user={user} key={user.id} />);
        });
        var list = <div>
                        <List>
                            {nodes}
                        </List>
                    </div>
        return list;
    }
})