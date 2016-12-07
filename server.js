/**
 * Created by Gabriel on 22/09/2016.
 */

var express = require('express');
var app = express();

var http = require('http');
var fs = require('fs');
var mongod= require('./utils/mongod');
var pug = require('./utils/pugrendering');
var cacheman=  require('./utils/cachemanager');
var formidable = require('formidable');
var subdomain = require('./utils/subdomain');

var p2p = require('./utils/p2p');


//https
var  https = require('https');
var cfg =  {

    // providing server with  SSL key/cert
    key: fs.readFileSync("./certificates/private.key"),
    cert: fs.readFileSync("./certificates/certificate.crt")

};
//
var server=https.createServer(cfg,app).listen(443);

p2p.signallingServer(server);




var ObjectID = require('mongodb').ObjectID;

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

cacheman.startServer('localhost',11211);

//////////// END REQUIREs ////////////////

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

app.get('/', function (req, res) {

res.send("OK");

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










app.post('/add/:item',addItem);

function addItem(req,res){

    var item = req.params.item;
    mongod.insert(req.body,item);
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

