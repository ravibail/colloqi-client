var _ = require('lodash');

var ReportCollection = require('../models/reports'),
    ReportModel = require('../models/reports');
var darConfig = [
        {
            title: "Task",
            //title: "CRC/EuroChamp/Partner/Customer Meeting",
            subMenu: [
                {name:"Task",code:'011'}
            ]
        },
        {
            title: "CRC/EuroChamp/Leader Meeting",
            //title: "CRC/EuroChamp/Partner/Customer Meeting",
            subMenu: [
                {name:"Eurochamp",code:'021',crc:true,division:true,level:true,empcode:true,phone:true},
                {name:"Club Qualifier Eurochamp",code:'022',crc:true,division:true,level:true,empcode:true,phone:true},
                {name:"CRC Visit",code:'024',crc:true,empcode:true,phone:true},
                {name:"Meeting Leader",code:'025',crc:true,empcode:true,phone:true}
            ]
        },
        {
            title: "Partner/Influencer Meeting",
            subMenu: [
                {name:"FDO",code:'071',organization:true,city: true,phone:true},
                {name:"FBP",code:'072',organization:true,city: true,phone:true},
                {name:"Service BP",code:'073',organization:true,city: true,phone:true},
            ]
        },
        {
            title: "Customer Meeting",
            //title: "CRC/EuroChamp/Partner/Customer Meeting",
            subMenu: [
                {name:"Customer",code:'031',address:true,city:true,pincode:true,phone:true, phone2:true},
                {name:"Other Activity",code:'032',address:true,city:true,pincode:true,phone:true}
            ]
        },
        {
            title: "Institutional Visit for Bulk Sales",
            subMenu: [
                {name:"Builder/Developer",code:'041',organization:true,city:true,phone:true},
                {name:"Corporate Customer of Forbes Pro",code:'042',organization:true,city:true,phone:true},
                {name:"Corporate Customer",code:'044',organization:true,city:true,phone:true},
                {name:"Bank Or Other CSR Companies",code:'043',organization:true,city:true,phone:true},
            ]
        },
        {
            title: "Field Coaching and Training",
            subMenu: [
                {name:"Field Coaching",code:'051',crc:true,empcode:true},
                {name:"Training Programme",code:'052',crc:true,empcode:true},
                {name:"Induction Programme",code:'053',crc:true,empcode:true}
            ]
        },
        {
            title: "Business Transformation",
            subMenu: [
                {name:"CRC covered for Rental Business",code:'061',organization:true,address:true,city:true,pincode:true,phone:true},
                {name:"FDO Opened",code:'062',organization:true,address:true,city:true,pincode:true,phone:true},
                {name:"FBP Opened",code:'063',organization:true,address:true,city:true,pincode:true,phone:true},
                {name:"Paani Ka Doctor Clinics Opened",code:'064',organization:true,address:true,city:true,pincode:true,phone:true}
            ]
        }
    ],
    overwriteStats = ['mod','or','op'],
    tasks = ['op','or','mod','lr','lc','demo','sales','orToMod','opToMod','demoToSales','salesToOr',
             'salesToMod','lcToLr'],
    userStats = {},
    category,
    modes = ['In person', 'Over phone'],
    darKeys = ['purpose','result','person','empcode','persons','crc','division','level',
                    'organization','phone','phone2','address','city','pincode'],
    daysList = [],
    fields = {
        "task": [
            {"name": "mod", "title": "Module", "maxLength": "4"},
            {"name": "or", "title": "On Roll", "maxLength": "4"},
            {"name": "op", "title": "Operatives", "maxLength": "4"},
            {"name": "demo", "title":"Demo", "maxLength": "5"},
            {"name": "sales", "title":"Sales", "maxLength": "5"},
            {"name": "lr", "title": "Leads Received", "maxLength": "5"},
            {"name": "lc", "title": "Leads Converted", "maxLength": "5"}
        ],
        "page1": [
            {"name": "mode", "title": "Select Mode", "type":"select", "value": modes},
            {"name": "type", "title": "Select Type", "type": "select"},
            {"name": "date", "title": "Meeting Date", "type": "select"},
            {"name": "startTime", "title": "Start Time", "type": "time"},
            {"name": "endTime", "title": "End Time", "type":"time"},
            {"name": "purpose", "title": "Purpose", "type": "text"},
            {"name": "result", "title": "Outcome", "type": "text"}
        ],
        "page2": [
            {"name": "crc", "title": "CRC Name", "type": "text"},
            {"name": "division", "title": "Division", "type": "text"},
            {"name": "person", "title": "Person", "type": "person"},
            {"name": "level", "title": "Level", "type": "text"},
            {"name": "organization", "title": "Organization", "type": "text"},
            {"name": "phone", "title": "Phone Number", "type": "text"},
            {"name": "phone2", "title": "Another phone number", "type": "text"},
            {"name": "address", "title": "Address", "type": "text"},
            {"name": "city", "title": "City", "type": "text"},
            {"name": "pincode", "title": "PIN", "type": "text"}
        ]
    },
    allReports = {},
    displayFields = {
        "task": {
            "type": "Type",
            "date": "Date",
            "mod": "Module",
            "op": "Operatives",
            "or": "On Roll",
            "demo": "Demo",
            "sales": "Sales",
            "lr": "Leads Received",
            "lc": "Leads Converted"
        },
        "engagement": {
            "type": "Type",
            "mode": "Mode",
            "date": "Date",
            "startTime": "Started",
            "endTime": "Till",
        }
    };


var getDarCycleData =  function(userId,cb,nofetch,forCategory) {
    var returnFn = function() {
        if (cb) {
            if (userId)
                cb(userStats[userId],category);
            else
                cb(userStats,category);
        }
    }


    var getStats = function() {
        var stats = Stat.find({filter: {where: {categories: category.id}}},
            function (value, responseHeaders) {
                userStats = {};
                stats.forEach(function (stat) {
                    if (userStats[stat.user.dbid])
                        userStats[stat.user.dbid].push(stat);
                    else
                        userStats[stat.user.dbid] = [stat];
                })
                returnFn();
            }, cqiPopup.showServerError)
    }

    if (nofetch && (!userId || userStats[userId])) {
        returnFn();
        return;
    }
    if (!forCategory) {
        var date = new Date();
        date.setUTCHours(0, 0, 0, 0)
        var currentCycle = Category.findOne({
            filter: {
                where: {
                    "and": [
                        {"startDate": {lte: date}},
                        {"endDate": {gte: date}},
                    ]
                }
            }
        }, function (value, responseHeaders) {
            category = currentCycle;
            getStats();
        }, cqiPopup.showServerError)
    } else {
        category = forCategory;
        getStats();
    }
}
            
var getIndividualReports = function(userIds, code, duration, cb) {
    var reports;
    var criteria = {
        'and': [
            {"type": 'dar'},
            {'sender.dbid': {in: userIds}},
            {'time': {gte: duration.start}},
            {'time': {lt: duration.end}}
        ]
    }
    if (tasks.indexOf(code) >= 0) {
        code = '011';
    }
    var messages = Message.find({filter: {where:criteria}}, function(value,responseheaders) {
        reports = [];
        messages.forEach(function(msg) {
            if (msg.content.dar && (!code || msg.content.dar.code == code)) {
                reports.push(msg);
            }
        });
        cb(reports);
    }, cqiPopup.showServerError)
}

var getAllReports = function() {
    var collection = new ReportCollection(new ReportModel({type: 'dar'}));
    collection.fetch({success: function(response, reports, options) {
        reports = _.filter(reports, function(o) { return (o.type === 'dar');});
        reports.forEach(function(report) {
            report.sender = report.sender || {dbid: 'Unknown'};
            allReports[report.sender.dbid] = allReports[report.sender.dbid] || [];
            allReports[report.sender.dbid].push(report);
        })
    }, error: function(error,data) {
        console.log(data);
    }})
}

var init = function () {
    var today = new Date(),
        yesterday = new Date();
    today.setUTCHours(0,0,0,0);
    if (yesterday.getHours() < 14) {
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setUTCHours(0,0,0,0);
        daysList = [today, yesterday];
    } else
        daysList = [today];
    fields.page1[2].value = [];
    daysList.forEach(function(day) {
        fields.page1[2].value.push({name: day.toDateString(), value: day});
    });
}

init();

module.exports = {
    darConfig: darConfig,
    darKeys: darKeys,
    overwriteStats: overwriteStats,
    modes: modes,
    daysList: daysList,
    fields: fields,
    allReports: allReports,
    getAllReports: getAllReports,
    displayFields: displayFields
}