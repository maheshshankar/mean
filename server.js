/**
 * Created by vemulma on 1/31/2017.
 */

'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3390;
var ash = require('lodash');
const Student = require('./schema/register-formschema.js');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var x2js = require('x2js');
var x2jsobj = new x2js();
var json2xml = require('json2xml');

/*
var data = [{
    "attrNamr": "custId",
    "datatype": "s",
    "df": "maheshsh"
},
    {
        "attrNamr": "custId",
        "datatype": "s",
        "df": "maheshsh"
    }];
var abc = x2jsobj.js2xml(data);
var dataa = { "operationValueString": {
    "__prefix": "mas",
  //      "__text":categoryCode+"~"+categoryDesc+"~"+serviceCode+"~"+categoryType+"~"+parentCategoryCode+"~"+workflowId+"~"+status+"~"+lastAccessedBy+"~"+lastAccessedDate+"~"+additionalData+"~"+customerCategoryCode+"~"+postToRemedy+"~"+nccDesc+"~"+nccCode+"~"+nccDesc
    "__text": "1001~Check bill~GSM~Q~0~0~I~~02/02/2017 12:22:06~<DATA>"+abc+"</DATA>~H~N~N~~"
}};
*/

//var xmll  = "&lt;DATA>&lt;/DATA>";
//var xl = x2jsobj.xml2js(xmll);

var abcc = x2jsobj.js2xml(dataa);
//console.log(xml);
console.log("11"+abcc);
//console.log(xl);
var a=x2jsobj.xml2js(xml)
//console.log("22"+a)
app.use((req, res, next) => {
    res.setHeader('ACCESS-CONTROL-ALLOW-ORIGIN', '*');
    res.setHeader('ACCESS-Control-Allow-Method', 'GET,POST,PUT,DELETE');
    res.setHeader('ACCESS-CONTROL-ALLOW-Headers', 'X-Requested-With,content-type');
    next();
});

mongoose.connect("mongodb://localhost/mean",function(err){
    if(err) throw err.message;
    console.log("DB Connection Established");
});

const db = mongoose.connection;
mongoose.promise = global.promise;

const appRouter = express.Router();

appRouter.route('/')
    .get((req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

appRouter.route('/')
    .post((req, res) => {
        console.log(req.body);
        /*let student = new Student();
        student.name = req.body.name;
        student.username = req.body.username;
        student.email = req.body.email;
        student.phonenumber = req.body.phonenumber;

        student.save((err) => {
            if(err) throw err.message;
            res.json({"msg":"User Saved..!"});
        })*/
    });

appRouter.route('/getRecord/:id')
    .get((req, res) => {
       let id = req.params.id;
       Student.findById({_id:id}, (err, doc) => {
           if(err) throw err.message;
           res.json(doc);
       })
    });

appRouter.route('/all')
    .get((req, res) => {
        Student.find((err, docs) => {
            if(err) throw err.message;
            res.json(docs);
        }).sort({"name":-1}).skip(0).limit(0);
    });

appRouter.route('/edit/:id')
    .put((req, res) => {
        let studentId = req.params.id;
        Student.findById({_id : studentId},(err, doc) => {
            if(err) throw err.message;
            if(req.body.name) doc.name = req.body.name;
            if(req.body.username) doc.username = req.body.username;
            if(req.body.email) doc.email = req.body.email;
            if(req.body.phonenumber) doc.phonenumber = req.body.phonenumber;
            doc.save((err) => {
                if(err) err.message;
                res.json({"msg":"User Updated..!"});
            })
        })
    });
appRouter.use((req, res, next) => {
    //console.log("In Router Usage" + req.body.username);
    next();
});

appRouter.route('/login')
    .post((req, res) => {
        let username = req.body.username;
        Student.findOne({username:username},(err, doc) => {
            if(err) throw err.message;
            res.json(doc);
        })
    });

app.use('/app', appRouter);

app.listen(port, () => {
    console.log("App Started Listening at" + " " + port);
});