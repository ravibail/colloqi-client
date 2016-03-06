var React = require('react'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    Paper = require('material-ui/lib/paper'),
    List = require('material-ui/lib/lists/list'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Divider = require('material-ui/lib/divider'),
    ClipboardIcon = require('material-ui/lib/svg-icons/content/content-paste');
    
var Node = React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Directory',
    
    render: function() {
        var user = this.props.user,
            getUserReports = this.getUserReports;
        var childNodes = this.props.user.items.map(function(sub,index) {
            return <Node user={sub} key={sub.id}/>;
        })
        return (
            <ListItem key={user.id} primaryText={user.title} nestedItems={childNodes}
                                    rightIcon={<ClipboardIcon href={'/viewReports/'+user.id+'/'+user.title}/>} />
        )
    }
});

module.exports = {
    directory: React.createClass({
        mixins: [ampersandMixin],
        displayName: 'Directory',
        
        render: function() {
            var directory = [];
            app.directory.forEach(function(user) {
                directory.push(<ListItem key={user.id}>{user.title}</ListItem>);
            })
            var list = <div>
                            <List>
                                {directory}
                            </List>
                        </div>
            return list;
        }
    }),
    node: Node
}