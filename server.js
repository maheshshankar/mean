/**
 * Created by vemulma on 1/31/2017.
 */

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3390;
const Student = require('./schema/register-formschema.js');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
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
    .get(function (req, res) {
        res.sendFile(__dirname + '/index.html');

    });

appRouter.route('/')
    .post(function(req, res){
        var student = new Student();
        student.name = req.body.name;
        student.username = req.body.username;
        student.email = req.body.email;
        student.phonenumber = req.body.phonenumber;

        student.save(function(err){
            if(err) throw err.message;

            res.json({"msg":"User Saved..!"});
        })
    });

appRouter.route('/all')
    .get(function(req, res){
        Student.find(function(err, docs){
            if(err) throw err.message;

            res.json(docs);
        }).sort({"name":-1}).skip(0).limit(0);
    });

appRouter.route('/edit/:id')
    .put(function(req, res){
        var studentId = req.params.id;
        Student.findById({_id : studentId},function(err, doc){
            if(err) throw err.message;

            if(req.body.name) doc.name = req.body.name;
            if(req.body.username) doc.username = req.body.username;
            if(req.body.email) doc.email = req.body.email;
            if(req.body.phonenumber) doc.phonenumber = req.body.phonenumber;
        doc.save(function(err){
            if(err) err.message;
            res.json({"msg":"User Updated..!"});
        })

        })
    });

app.use('/app', appRouter);

app.listen(port, function(){
    console.log("App Started Listening at" + " " + port);
});