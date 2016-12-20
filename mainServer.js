/**
* Created by Gabriel Macus on 18/12/2016.
*/
'use strict';

var async = require('async');
var fs = require('fs');
var express = require('express');
var Connection = require('./framework/db/Connection');
var Core = require('./framework/middleware/Core');
var User  = require('./framework/middleware/User')
var connection = new Connection('localhost','db',27017);

var https = require('https');
var cfg =  {

    // providing server with  SSL key/cert
    key: fs.readFileSync("./certificates/private.key"),
    cert: fs.readFileSync("./certificates/certificate.crt")

};

global.ObjectID = require('mongodb').ObjectID;
var app= express();
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



var core = new Core(app,'secret');
var user = new User(app,connection,'secret');
var server=https.createServer(cfg,app).listen(443);


var HTML = require('./framework/classes/HTML');


app.get('/',function(req,res){



    var html = new HTML(language,"index",{nombre:"Roberto"},res);


    res.send(html.code);


})