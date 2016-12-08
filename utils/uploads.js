/**
 * Created by Gabriel on 23/08/2016.
 */

var logger = require('./log');
module.exports=
{
    upload: function (dir,res,req,callback,fieldCallback)
    {



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


        var mainDir= dir;
            // every time a file has been uploaded successfully,
            // rename it to it's orignal name
            form.on('file', function(field, file) {
                var existeDirectorio=  fs.existsSync(  form.uploadDir);

                if(existeDirectorio===false)
                {
                    fs.mkdirSync(form.uploadDir,0777);
                }
                var fileNameSplit=file.name.split(".");
                urls.push({url:mainDir+"/"+file.name,name:file.name,size:bytesToKb(file.size),type:fileNameSplit[fileNameSplit.length-1]});


                var dir =path.join(form.uploadDir, file.name);

                fs.rename(file.path, dir);


            });
        var json =
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
            form.parse(req);



    }




}



var bytesToKb= function (bytes) {

    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i == 0) return bytes + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];

}