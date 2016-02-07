var React = require('react'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    Paper = require('material-ui/lib/paper'),
    List = require('material-ui/lib/lists/list'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Divider = require('material-ui/lib/divider');

module.exports = {
    groupView: React.createClass({
        mixins : [ampersandMixin],
        displayName : 'Layout',
        
        render: function() {
            var selectedGroup, membersList = [];
            var id = this.props.id;
            app.groups.forEach(function(group) {
                if (group.id == id) {
                    selectedGroup = group;
                }
            })
            for(var id in selectedGroup.members) {
                membersList.push(<ListItem key={id}> {selectedGroup.members[id].title} </ListItem>);
            }
            var details =<div>
                          <List>
                            <ListItem>{selectedGroup.isPublic?'Public':'Private'}; {selectedGroup.messageAll? 'Message all' : 'Message only admins'}</ListItem>
                          </List>
                          <Divider />
                          <List subheader='Participants'>
                            {membersList}
                          </List>
                        </div>
            return (<Paper zDepth={1} children={details}/>)
        }
    }),
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
    })
}