var React = require('react'),
    ReactDOM = require('react-dom'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    AppBar = require('material-ui/lib/app-bar'),
    LeftNav = require('material-ui/lib/left-nav'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Button = require('material-ui/lib/raised-button'),
    Dialog = require('material-ui/lib/dialog'),
    SettingsIcon = require('material-ui/lib/svg-icons/action/settings'),
    Components = require('./components'),
    Badge = require('material-ui/lib/badge'),
    AttachIcon = require('material-ui/lib/svg-icons/editor/attach-file');

var inputStyle = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
}

module.exports = class Layout extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            page: app.state,
            user: app.user,
            open: false,
            assets: app.assets
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.viewDirectory = this.viewDirectory.bind(this);
        this.selectEngagement = this.selectEngagement.bind(this);
        this.selectReportees = this.selectReportees.bind(this);
        this.task = this.task.bind(this);
        this.previewReport = this.previewReport.bind(this);
        this.openModal = this.openModal.bind(this);
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
    
    previewReport() {
        this.setState({open: false});
    }
    
    openModal() {
        this.setState({open: true});
    }
    
    uploadFile(event) {
        var formData = new FormData(),
            xhr = new XMLHttpRequest();
        for(var i=0; i<event.target.files.length; i++) {
            formData.append('file',event.target.files[i]);
        }
        xhr.open('POST','http://localhost:4000/api/containers/'+app.group.id+'/upload');
        xhr.send(formData);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                app.assets = app.assets || [];
                app.assets.push({
                    name: data.result.fields.timestamp+'_'+data.result.files.file[0].name,
                    type: data.result.files.file[0].type
                })
            }
        }
    }
    
    render() {
        var groupsList = [
                <ListItem primaryText="Enagagements" key="1" onTouchTap={this.selectEngagement}/>,
                <ListItem primaryText="Task" key="2" onTouchTap={this.task}/>, 
                <ListItem primaryText="View Reports" key="3" onTouchTap={this.selectReportees}/>
            ],
            iconButton;
        if (app.state.state == 'form') {
            iconButton = <Button secondary={true} onTouchTap={this.uploadFile} icon={<AttachIcon />} children={<input type='file' onChange={this.uploadFile} style={inputStyle}/>} />
        } else if (app.state.state === 'report') {
            iconButton = <Button secondary={true} label="View Reports" onTouchTap={this.openModal} />
        }
        var menu = <div>
                        <AppBar title={app.state.title}
                                onLeftIconButtonTouchTap={this.toggleMenu}
                                iconElementRight={iconButton}
                        />
                        <Dialog title="Select report interval"
                                modal={true}
                                open={this.state.open}
                                onRequestClose={this.handleClose}
                        >
                            <Components.reportModal />
                            <Button fullWidth={true} primaryText="Preview report" secondary={true} onTouchTap={this.previewReport} />
                        </Dialog>
                        < LeftNav open = {this.state.showMenu} docked = {false}
                                    onRequestChange={this.toggleMenu}>
                            <ListItem primaryText={app.user.title} secondaryText={app.user.email}
                                                        rightIcon={<SettingsIcon />} onTouchTap={this.viewProfile}/>
                            <ListItem primaryText="Reports" initiallyOpen={true}
                                    primaryTogglesNestedList={true} nestedItems={groupsList}/>
                            <ListItem onTouchTap={this.viewDirectory}>Directory</ListItem>
                        </LeftNav>
                        <div id='content'></div>
                    </div>
        return (menu);
    }
}