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
var resize = require('im-resize');
var path = require('path');


var output = {
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
};




app.post("/publishImages",function(req,res) {
    var ahora=  new Date();



uploads.upload("/images/"+ahora.getFullYear()+"/"+(ahora.getMonth()+1)+"/"+ahora.getDate(),res,req,function (urls,json) {



    var cantImages=urls.length;
    var i=0;


    urls.forEach(function (url) {


        var image = {
            path:process.cwd()+path.join(relativeWebsiteRoot,url.url)
        };


        url.type="image";

        resize(image, output, function(error, versions) {

            i++;

            if(versions)
            {
                versions.forEach(function(version){



                });
                if(i==cantImages)
                {

                    res.send(urls);
                }

            }

        });



    });





});
});

app.post("/publish",function(req,res){

    console.log(req.body);

    mongod.insert(req.body,"posts",function(result,err){

        if(result)
        {
            res.send(true);
        }
        else
        {
            res.send(false);
        }
    });


});

