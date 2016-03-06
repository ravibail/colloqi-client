var React = require('react'),
    ampersandMixin = require('ampersand-react-mixin'),
    app = require('ampersand-app'),
    Paper = require('material-ui/lib/paper'),
    List = require('material-ui/lib/lists/list'),
    ListItem = require('material-ui/lib/lists/list-item'),
    Divider = require('material-ui/lib/divider'),
    Button = require('material-ui/lib/raised-button'),
    FlatButton = require('material-ui/lib/flat-button'),
    TextField = require('material-ui/lib/text-field'),
    Select = require('material-ui/lib/select-field'),
    MenuItem = require('material-ui/lib/menus/menu-item'),
    TimePicker = require('material-ui/lib/time-picker/time-picker'),
    DatePicker = require('material-ui/lib/date-picker/date-picker'),
    ContentAdd = require('material-ui/lib/svg-icons/content/add-circle'),
    ContentRemove = require('material-ui/lib/svg-icons/content/clear'),
    GridList = require('material-ui/lib/grid-list/grid-list'),
    GridTile = require('material-ui/lib/grid-list/grid-tile');
    
var eflData = require('../efl-e3r/efl-e3r'),
    collection = require('../models/reports-collection'),
    reportsModel = require('../models/reports');

var reports = new collection();

var dar = {
        
    },
    submenu = [];
    
var submitReport = function(report) {
    var model = new reportsModel({
        'type': 'dar',
        'sender': {
            'dbid': app.user.id,
            'title': app.user.title
        },
        'time': new Date(),
        'location': {address: 'No location'},
        'groupId': app.group.id,
        'groupSubject': app.group.subject,
        'content': {
            'dar': report
        },
        'forAll': true
    },{parse: true});
    reports.create(model);
    app.navigate('');
}

module.exports = {
    engagements : React.createClass({
        mixins: [ampersandMixin],
        displayName: 'Select an engagement',
        
        eflData : eflData,
        
        render: function() {
            var engagements = [];
            var select = this.select,
                eflData = this.eflData;
            for(var index in eflData.darConfig){
                var menu = eflData.darConfig[index];
                if (menu.title != 'Task') {
                    engagements.push(<ListItem href={"/form/"+index}><FlatButton label={menu.title} fullWidth={true}/></ListItem>);
                }
            }
            
            return (
                <List>
                    {engagements}
                </List>
            )
        }
    }),
    taskForm: React.createClass({
        mixins: [ampersandMixin],
        displayName: 'Report form - E3R',
        getInitialState: function() {
            dar = {};
            dar.type = eflData.darConfig[0];
            return {dar: dar};
        },
        
        hasChanged: function(event,index,value) {
            if (event && event.target.name) {
                dar[event.target.name] = event.target.value;
            } else {
                dar.date = value;
                this.setState({dar: dar});
            }
        },
        
        submitReport: function() {
            for(var i in dar) {
                if (i != 'type' && i != 'date') {
                    dar[i] = parseInt(dar[i]);
                }
            }
            dar.type = 'Task';
            dar.code = '011';
            dar.mode = 'In Person';
            dar.date = dar.date;
            submitReport(dar);
        },
        
        render: function() {
            var formFields = [];
            var hasChanged = this.hasChanged;
            eflData.fields.task.forEach(function(field) {
                formFields.push(<ListItem><TextField floatingLabelText={field.title} type="number" name={field.name} value={dar[field.name]} maxLength={field.maxLength} fullWidth={true} onChange={hasChanged}/>
                                </ListItem> );
            })
            var options = [];
            eflData.daysList.forEach(function(day) {
                options.push(<MenuItem primaryText={day.toDateString()} value={day} />);
            })
            return (
                <List>
                    <ListItem>
                        For Date: <Select name="date" hintText="For date" fullWidth={true} value={this.state.dar['date']} onChange={hasChanged} children={options}/>
                    </ListItem>
                    {formFields}
                    <Button fullWidth={true} label="Save" secondary={true} onTouchTap={this.submitReport} />
                </List>
            )
        }
    }),
    formPage: React.createClass({
        mixins: [ampersandMixin],
        displayName: 'Report form - E3R',
        getInitialState: function() {
            dar = {};
            this.addPerson = this.addPerson.bind(this);
            this.removePerson = this.removePerson.bind(this);
            return { dar: dar, pageNo: '1'};
        },
        
        next: function() {
            if (this.state.pageNo == '1') {
                this.setState({pageNo: '2'});
            } else {
                var type = dar.type;
                dar.code = type.code;
                dar.type = type.name;
                dar.date = dar.date.value;
                submitReport(dar);
            }
        },
        
        hasChanged: function(event,index,value) {
            if (event && event.target && event.target.name) {
                dar[event.target.name] = event.target.value;
            } else if(event) {
                dar[event.name] = event.value;
            }
            this.setState({dar: dar});
        },
        
        addPerson : function() {
            if (!dar.empcode && !dar.person) {
                return;
            }
            dar.persons = dar.persons || [];
            dar.persons.push({empcode: dar.empcode, title: dar.person});
            dar.empcode = '';
            dar.person = '';
            this.setState({dar: dar, pageNo: this.state.pageNo});
        },
        removePerson : function(person) {
            dar.persons.splice(dar.persons.indexOf(person),1);
            this.setState({dar: dar, pageNo: this.state.pageNo});
        },
        
        render: function() {
            var formFields = [],
                pageNo = this.props.page,
                type = eflData.darConfig[this.props.index],
                hasChanged = this.hasChanged,
                addPerson = this.addPerson,
                removePerson = this.removePerson;
            
            submenu = type.subMenu;
            
            eflData.fields['page'+this.state.pageNo].forEach(function(field) {
                if (pageNo != '2' || dar.type[field.name] || field.name == 'person') {
                    if (field.type == 'text') {
                        formFields.push(<ListItem><TextField floatingLabelText={field.title} value={dar[field.name]} key={field.name} onChange={hasChanged} name={field.name} fullWidth={true}/></ListItem>);
                    } else if (field.type == 'time') {
                        formFields.push(<ListItem>{field.title}: <TimePicker name={field.name} value={dar[field.name]} key={field.name} onChange={function(event,value) {hasChanged({name:field.name, value:value})}} hintText={field.title} fullWidth={true} /></ListItem>);
                    }else if (field.type == 'select') {
                        var menuItems = [];
                        var value = field.value || submenu;
                        value.forEach(function(option) {
                            menuItems.push(<MenuItem value={option} key={option.name} primaryText={option.name || option} />);
                        })
                        formFields.push(<ListItem><Select name={field.name} value={dar[field.name]} key={field.name} onChange={function(event,index,selected){hasChanged({name:field.name,value:selected})}}
                                        fullWidth={true} floatingLabelText={field.title}>{menuItems}</Select></ListItem>);
                    } else if (field.type == 'person') {
                        formFields.push(<ListItem>
                                            <GridList cols={3} cellHeight={70} fullWidth={true}>
                                                <GridTile><TextField name='empcode' floatingLabelText='Emp code' value={dar.empcode} key={field.name} onChange={hasChanged}/></GridTile>
                                                <GridTile><TextField name="person" floatingLabelText="Person Name" value={dar.person} onChange={hasChanged}/></GridTile>
                                                <GridTile><ContentAdd color='green' onTouchTap={addPerson}/></GridTile>
                                            </GridList>
                                        </ListItem> );
                        if (dar.persons) {
                            var personsField = [];
                            dar.persons.forEach(function(person) {
                                personsField.push(<GridList key={person.empcode} cols={3} cellHeight={50}>
                                                    <GridTile><FlatButton label={person.empcode} /></GridTile>
                                                    <GridTile><FlatButton label={person.title} /></GridTile>
                                                    <GridTile><ContentRemove color='red' onTouchTap={function() {removePerson(person)}} mini={true}/></GridTile>
                                                </GridList>);
                            })
                            formFields.push(<List insetChildren={true} children={personsField} />);
                        }
                    }
                }
            });
            return (
                <List>
                    {formFields}
                    <Button secondary={true} fullWidth={true} label={this.state.pageNo=='1'?'Next':'Submit'} onTouchTap={this.next}/>
                </List>
            );
        }
    }),
    display: React.createClass({
        mixins: [ampersandMixin],
        displayName: 'Display reports',
        
        render: function() {
            var reportsList = [];
            return (<List>
                        {reportsList}
                    </List>);
        }
    })
}