/**
 * Created by Gabriel on 29/12/2016.
 */

"use strict";
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var resize = require('im-resize');
var mkdirp = require('mkdirp');


module.exports=class Upload
{
   
    constructor(uploadDir,req,callback,output)
    {
       //create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all uploads in the /uploads directory
        form.uploadDir = path.join(process.cwd(), uploadDir);

       var uploadedFiles =[];



        mkdirp(form.uploadDir,function (err) {

            if(err)
            {
                throw err;
            }



            form.on('file', function(field, file) {

                var newName = path.join(form.uploadDir, file.name);
                fs.rename(file.path, newName);


                var ext = file.name;
                ext = ext.split(".");
                var nameWithoutExt=ext[0];
                ext  = ext[ext.length-1];

                uploadedFiles.push({ext:ext,name:nameWithoutExt,path:newName});




            });

            // log any errors that occur
            form.on('error', function(err) {

                throw err;

            });

            // once all the files have been uploaded, send a response to the client
            form.on('end', function() {

                if(!output)
                {
                    if(callback)
                    {
                        callback(true);
                    }
                }
                else
                {
                    var imagesVersions =[];
                    uploadedFiles.forEach(function (image,index) {



                        resize(image, output, function(error, versions) {




                            if(error)
                            {
                                throw error;
                            }


                            versions.forEach(function (item,index) {

                                item.name= image.name+item.suffix+"."+image.ext;
                                item.url= uploadDir+item.name;
                                imagesVersions.push(item);
                            });


                            if(index+1==uploadedFiles.length)
                            {
                                if(callback)
                                {
                                    callback(imagesVersions);
                                }
                            }


                        });
                    });


                }

            });
            form.parse(req);




        });





    }





}