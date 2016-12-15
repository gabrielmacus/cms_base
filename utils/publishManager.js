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

