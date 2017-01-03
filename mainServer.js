/**
* Created by Gabriel Macus on 18/12/2016.
*/
'use strict';

var async = require('async');
var fs = require('fs');
var express = require('express');
var Connection = require('./framework/db/Connection');
var Core = require('./framework/middleware/Core');
var User  = require('./framework/middleware/User');
var Email =require('./framework/middleware/Email');
var Gallery = require('./framework/middleware/Gallery');

var connection = new Connection('localhost','db',27017);

global.mainConfig = JSON.parse(fs.readFileSync('config/global.json','UTF-8'));


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



var gallery = new Gallery(app,connection,2);

var core = new Core(app,'secret');

var user = new User(app,connection,'secret');
var email = new Email(app);


var server=https.createServer(cfg,app).listen(443);

var Upload = require('./framework/classes/Upload');


app.post('/upload',function(req,res){


    var upload = new Upload('/fotos/recursive/',req,function (result) {
        console.log(result);

        res.end('ok');


    },{
        versions: [{
            suffix: '-thumb',
            maxHeight: 150,
            maxWidth: 150
        },
            {
                suffix: '-sthumb',
                maxHeight: 75,
                maxWidth:75
            }]
    });
});