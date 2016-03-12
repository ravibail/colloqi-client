var React = require('react'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    Paper = require('material-ui/lib/paper'),
    List = require('material-ui/lib/lists/list'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Divider = require('material-ui/lib/divider'),
    ClipboardIcon = require('material-ui/lib/svg-icons/content/content-paste'),
    FlatButton = require('material-ui/lib/flat-button'),
    Select = require('material-ui/lib/select-field'),
    DatePicker = require('material-ui/lib/date-picker/date-picker'),
    GridList = require('material-ui/lib/grid-list/grid-list'),
    GridTile = require('material-ui/lib/grid-list/grid-tile');
    
var Node = React.createClass({
    mixins: [ampersandMixin],
    displayName: 'Directory',
    
    viewReports: function(id, title) {
        app.navigate('#viewReports/'+id+'/'+title);
    },
    
    render: function() {
        var user = this.props.user,
            getUserReports = this.getUserReports,
            viewReports = this.viewReports;
        var childNodes = this.props.user.items.map(function(sub,index) {
            return <Node user={sub} key={sub.id}/>;
        })
        return (
            <ListItem key={user.id} primaryText={user.title} nestedItems={childNodes}
                                    leftIcon={<ClipboardIcon onTouchTap={function(){viewReports(user.id,user.title)}}/>} />
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
    node: Node,
    reportModal: React.createClass({
        mixins: [ampersandMixin],
        displayName: 'Report modal',
        
        getInitialState: function() {
            app.report = {
                cycle: app.category,
                duration: 'cycle',
                type: 'Team',
                summary: false,
                date: null,
                week: {}
            };
            return ({report: app.report});
        },
        
        modifyReport: function(key, value) {
            app.report[key] = value;
            this.setState({report: app.report});
        },
        
        calculateWeek: function() {
            
        },
        
        render: function() {
            var selectDuration = [],
                selectOption = [];
            
            var modifyReport = this.modifyReport;    
            
            if (app.report.duration == 'cycle') {
                selectDuration.push(
                    
                );
            } else if (app.report.duration == 'week') {
                
            } else {
                selectDuration.push(
                    <DatePicker fullWidth={true} floatingLabelText="Select date" onChange={function(event){modifyReport('date',event.value)}} />
                );
            }
            return (<div>
                <GridList cols={3} cellHeight={30}>
                    <GridTile onTouchTap={function(){ modifyReport('type','Team')}}>
                        <FlatButton label="Team" disabled={app.report.type !== 'Team'} />
                    </GridTile>
                    <GridTile onTouchTap={function(){ modifyReport('type','Individual')}}>
                        <FlatButton label="Individual"disabled={app.report.type !== 'Individual'} />
                    </GridTile>
                    <GridTile onTouchTap={function(){ modifyReport('type','Time Sheet')}}>
                        <FlatButton label="Time Sheet" disabled={app.report.type !== 'Time Sheet'} />
                    </GridTile>
                </GridList>
                <GridList cols={3} cellHeight={30}>
                    <GridTile onTouchTap={function(){ modifyReport('duration','cycle')}}>
                        <FlatButton label="Cycle" disabled={app.report.duration !== 'cycle'} />
                    </GridTile>
                    <GridTile onTouchTap={function(){ modifyReport('duration','week')}}>
                        <FlatButton label="Week" disabled={app.report.duration !== 'week'} />
                    </GridTile>
                    <GridTile onTouchTap={function(){ modifyReport('duration','day')}}>
                        <FlatButton label="Day" disabled={app.report.duration !== 'day'} />
                    </GridTile>
                </GridList>
                {selectDuration}
                <GridList cols={2} cellHeight={30} >
                    <GridTile onTouchTap={function(){ modifyReport('summary',true)}}>
                        <FlatButton label='Summary' disabled={!app.report.summary} />
                    </GridTile>
                    <GridTile onTouchTap={function(){modifyReport('summary',false)}}>
                        <FlatButton label='Detailed' disabled={app.report.summary} />
                    </GridTile>
                </GridList>
            </div>);
        }
    })
}