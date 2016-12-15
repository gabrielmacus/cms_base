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
var ImageMagick = require('imagemagick');



var easyimg = require('easyimage');

app.post("/publishImages",function(req,res) {
    var ahora=  new Date();


    
uploads.upload(relativeWebsiteRoot+"/images/"+ahora.getFullYear()+"/"+(ahora.getMonth()+1)+"/"+ahora.getDate(),res,req,function (urls,json) {

    urls.forEach(function (url) {

        console.log(url);



        easyimg.rescrop({
            src:'146.jpg', dst:'147.jpg',
            width:500, height:500
        }).then(
            function(image) {
                console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
            },
            function (err) {
                console.log(err);
            }
        );

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

