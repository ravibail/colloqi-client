var React = require('react'),
    ReactDOM = require('react-dom'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    AppBar = require('material-ui/lib/app-bar'),
    LeftNav = require('material-ui/lib/left-nav'),
    ListItem = require('material-ui/lib/lists/list-item'),
    CardHeader = require('material-ui/lib/card/card-header'),
    SettingsIcon = require('material-ui/lib/svg-icons/action/settings');

module.exports = class Layout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            page: app.state,
            user: app.user
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.viewDirectory = this.viewDirectory.bind(this);
        this.selectEngagement = this.selectEngagement.bind(this);
        this.selectReportees = this.selectReportees.bind(this);
        this.task = this.task.bind(this);
    };

    toggleMenu() {
        this.setState({showMenu : !this.state.showMenu});
    }
    
    viewProfile() {
        this.toggleMenu();
        app.navigate('#profile');
    }
    
    viewDirectory() {
        this.toggleMenu();
        app.navigate('#directory');
    }
    
    selectEngagement() {
        this.toggleMenu();
        app.navigate('#engagements');
    }
    
    selectReportees() {
        this.toggleMenu();
        app.navigate('#reportees');
    }
    
    task() {
        this.toggleMenu();
        app.navigate('#task');
    }
    
    render() {
        var groupsList = [
                <ListItem primaryText="Enagagements" key="1" onTouchTap={this.selectEngagement}/>,
                <ListItem primaryText="Task" key="2" onTouchTap={this.task}/>, 
                <ListItem primaryText="View Reports" key="3" onTouchTap={this.selectReportees}/>
            ];
        var menu = <div>
                        <AppBar title={app.state.title}
                                onTouchTap={this.toggleMenu}
                        />
                        < LeftNav open = {this.state.showMenu} docked = {false}
                                    onRequestChange={this.toggleMenu}>
                            <ListItem primaryText={app.user.title} secondaryText={app.user.email} rightIcon={<SettingsIcon />} onTouchTap={this.viewProfile}/>
                            <ListItem primaryText="Reports" initiallyOpen={true}
                                    primaryTogglesNestedList={true} nestedItems={groupsList}/>
                            <ListItem onTouchTap={this.viewDirectory}>Directory</ListItem>
                        </LeftNav>
                        <div id='content'></div>
                    </div>
        return (menu);
    }
}