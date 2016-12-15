/**
 * Created by Gabriel on 06/10/2016.
 */
/**
 * Created by Gabriel on 22/09/2016.
 */

var fs = require('fs');




global.configs=[];


global.mainConfig = JSON.parse(fs.readFileSync("./mainConfig.json"));

global.website=mainConfig.currentWebsite;

global.websiteRoot=process.cwd()+"/views/websites/"+website;
global.relativeWebsiteRoot="/views/websites/"+website;
/*
global.configs.push(JSON.parse(fs.readFileSync("./views/websites/"+website+"/config/es/config.json")));

global.config = configs[0];
*/
global.request = require('request');


var express = require('express');
global.app = express();
global.Cookies= require('cookies');

var http = require('http');
var publishManager = require('./utils/publishManager')
var router =require("./utils/urlRouter");
global.mongod= require('./utils/mongod');
var pug = require('./utils/pugrendering');
var cacheman=  require('./utils/cachemanager');
var formidable = require('formidable');
global.subdomain = require('./utils/subdomain');
global.jwt    = require('jsonwebtoken');
var p2p = require('./utils/p2p');
var MD5 = require("crypto-js/md5");

//https
global.https = require('https');
var cfg =  {

    // providing server with  SSL key/cert
    key: fs.readFileSync("./certificates/private.key"),
    cert: fs.readFileSync("./certificates/certificate.crt")

};
//
var server=https.createServer(cfg,app).listen(443);

p2p.signallingServer(server);




global.ObjectID = require('mongodb').ObjectID;

global.bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



var userManager = require("./utils/userManager");
//http://scottksmith.com/blog/2014/09/04/simple-steps-to-secure-your-express-node-application/




    cacheman.startServer('localhost',11211);
app.set('view engine', 'pug');


app.get('/js/:file', function (req, res) {

    res.sendFile(__dirname+"/js/"+req.params.file);


});

app.get('/css/:file', function (req, res) {

    res.sendFile(__dirname+"/css/"+req.params.file);


});

app.get('/img/:file', function (req, res) {

    res.sendFile(__dirname+"/img/"+req.params.file);


});


//////////// END REQUIREs ////////////////




app.get('/', function (req, res) {

    res.send("OK");

});



app.get('/tests/:file', function (req, res) {


    
    var fileName= req.params.file;

    var body={};
    body.navbars={};
    body.forms={};
    fs.readFile('views/navbars/desktop/navbar.json', 'utf8', function(err, contents) {

        var navbar=JSON.parse(contents);
        body.navbars[navbar.id]=navbar;


        fs.readFile('views/navbars/desktop/form.json', 'utf8', function(err, contents) {

            var form= JSON.parse(contents);
            body.forms[form.id]=form;

            global.body =body;

            pug.renderFile("/development/tests/"+fileName+".pug",{body:body},res);
        });



    });











});




app.get('/site/:file', function (req, res) {


    var fileName= req.params.file;

    var idioma = subdomain.handleSubdomain(req.headers.host);
    console.log(idioma);
    if(!idioma)
    {
        idioma="es";
    }


    mongod.getAll("templates",function(data){

        data=data.filter(function(el){

            return el.nombre =="template1" && el.idioma==idioma;
        })[0];






        console.log(data);
        if(data)
        {
            pug.renderFile("/"+fileName+".pug",data,res);
        }

    });

});


app.get('/test/:file', function (req, res) {



    var fileName= req.params.file;
    pug.renderFile("/"+fileName+".pug",null,res);


});




app.post("/load/:item",getItems);





app.post('/add/:item',addItem);

function getItems(req,res) {
    var item = req.params.item;
    mongod.getAll(item,function (data) {

        res.send(JSON.stringify(data));

    });


}

function addItem(req,res){

    var item = req.params.item;
    mongod.insert(req.body,item);

    res.send({success:true});

}




/**
 *
 *
 *
 *
 * -Ejemplos y casos de uso
 */

function _exampleMemcache()
{
    var html= pug.renderFile("index.jade",{});

    cacheman.dataToMem('pug',html,10,function(data){
        res.send(data);

    });




    mongod.insert({Titulo:"Ace Man"},"Videojuegos");


    mongod.getAll("Videojuegos", function (data) {

        res.send(data);

    });


    mongod.find({_id:new ObjectID("57e5d4392d4cc111384bd78a")},"a",function(data){

        res.send(JSON.stringify(data));
    });



}

