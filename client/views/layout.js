var React = require('react'),
    ReactDOM = require('react-dom'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    AppBar = require('material-ui/lib/app-bar'),
    LeftNav = require('material-ui/lib/left-nav'),
    ListItem = require('material-ui/lib/lists/list-item'),
    MenuItem = require('material-ui/lib/menus/menu-item'),
    IconButton = require('material-ui/lib/icon-button'),
    NavigationMenu = require('material-ui/lib/svg-icons/navigation/menu'),
    ArrowDropRight = require('material-ui/lib/svg-icons/navigation-arrow-drop-right');

module.exports = class Layout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            page: app.state,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.viewDirectory = this.viewDirectory.bind(this);
    };

    toggleMenu() {
        this.setState({showMenu : !this.state.showMenu});
    }
    
    viewDirectory() {
        this.toggleMenu();
        app.navigate('#directory/');
    }
    
    render() {
        var groupsList = [];
        var toggleMenu = this.toggleMenu;
        var ampApp = app;
        app.groups.forEach(function(group) {
            var viewGroup = function() {
                ampApp.navigate('#groupView/'+group.id+'/'+group.subject);
                toggleMenu();
            }
            groupsList.push(<ListItem primaryText={group.subject} key={group.id} onTouchTap={viewGroup}/>);
        })
        var menu = <div>
                        <AppBar title={app.state.title}
                                onTouchTap={this.toggleMenu}
                                iconElementLeft = {<IconButton><NavigationMenu/></IconButton>}
                        />
                        < LeftNav open = {this.state.showMenu} docked = {false}
                                    onRequestChange={this.toggleMenu}>
                            <ListItem primaryText="Groups" initiallyOpen={true}
                                    primaryTogglesNestedList={true} nestedItems={groupsList}/>
                            <ListItem onTouchTap={this.viewDirectory}>Directory</ListItem>
                        </LeftNav>
                        <div id='content'></div>
                    </div>
        return (menu);
    }
}