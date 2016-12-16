/**
 * Created by Usuario on 08/12/2016.
 */
var validations = require("./validations");
var mailer = require("./mailer");
var MD5 = require("crypto-js/md5");
var pug = require('./pugrendering');
var fs = require('fs');
var uploads =require("./uploads");
var tokens={};
var utilities = require('./utilities');
var componentReader = require("./componentReader");
var formidable = require('formidable');
var uploads = require('./uploads');

var path= require('path');

var resize = require('im-resize');




app.post("/publishImages",function(req,res) {
    var ahora=  new Date();


    
uploads.upload(relativeWebsiteRoot+"/images/"+ahora.getFullYear()+"/"+(ahora.getMonth()+1)+"/"+ahora.getDate(),res,req,function (urls,json) {


    urls.forEach(function (url) {

  

        var image = {
            path: path.join( process.cwd(),url.url)
        };

        var output = {
            versions: [{
                suffix: '-thumb',
                maxHeight: 150,
                maxWidth: 150,
            }]
        };

        resize(image, output, function(error, versions) {
            if (error) { console.error(error); }
            console.log(versions);

        });




    })
    res.send(urls);
});
});

app.post("/publish",function(req,res){




    uploads.upload("/blah",res,req,function(urls,post){
        console.log(urls);
        mongod.insert(post,"posts",function(result,err){

            if(result)
            {
                res.send(true);
            }
            else
            {
                res.send(false);
            }
        });
    })



});

