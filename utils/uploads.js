/**
 * Created by Gabriel on 23/08/2016.
 */

var logger = require('./log');
var utilities =require('./utilities');
module.exports=
{
    upload: function (dir,res,req,callback)
    {


        try {

            var formidable = require('formidable'),
                path= require('path'),
                fs = require('fs');


            var urls=[];
            // create an incoming form object
            var form = new formidable.IncomingForm();

            // specify that we want to allow the user to upload multiple files in a single request
            form.multiples = true;

            // store all users in the  directory
            form.uploadDir = path.join(__dirname+"/..", dir);

            utilities.mkDirRecursive(form.uploadDir);




                form.parse(req);

                var mainDir= dir;
                // every time a file has been uploaded successfully,
                // rename it to it's orignal name



                form.on('file', function(field, file) {




                    var fileNameSplit=file.name.split(".");
                    var ext =fileNameSplit[fileNameSplit.length-1];


                    urls.push({url:mainDir+"/"+file.name,name:file.name,size:bytesToKb(file.size),type:ext});






                    utilities.getFileOcurrencies(form.uploadDir,file.name,function (length) {


                        file.name=length+"_"+file.name;
                        if(length>0)
                        {
                            var dir =path.join(form.uploadDir,file.name);
                        }
                        else
                        {
                            var dir =path.join(form.uploadDir,file.name);
                        }


                        //var dir =path.join(form.uploadDir, new Date().getTime()+"."+ext);
                        fs.rename(file.path, dir);



                    });



                });
                var json ;
                form.on('field', function(name, value) {

                    json=JSON.parse(value);
                });

                // log any errors that occur
                form.on('error', function(err) {




                    logger.log({type:"error",data:err});
                    if(callback)
                    {
                        callback(false);

                    }
                });

                // once all the files have been uploaded, send a response to the client
                form.on('end', function() {
                    logger.log({type:"info",data:{text:"file upload",files:urls}});
                    
                    if(callback)
                    {
                        callback(urls,json);

                    }



                });

                // parse the incoming request containing the form data







        }
        catch (e)
        {
            console.log(e);

        }




    }




}



var bytesToKb= function (bytes) {

    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];

}