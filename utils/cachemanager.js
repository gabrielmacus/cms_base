
var memjs = require('memjs');
var memjsClient;
var fs = require("fs");
var logger=require('./log');

module.exports=
{

    startServer:function(server,port,username,password)
    {


        memjsClient = memjs.Client.create(server+':'+port, {
                username: username,
                password: password
            });
    },
    /**@deprecated**/
    fileToMem:function(path,key,expirationTime,callback)
    {

        memjsClient.get(key,function(err,val){

            if(!err && val)
            {


                callback(val.toString());


            }
            else if(!val)
            {

                fs.readFile(path, function (err, data ) {

                    if(!err)
                    {

                        memjsClient.add('test',data,function(){},expirationTime);

                        callback(data.toString());


                    }

                });


            }
            else if(err)
            {

                callback(val.toString());
                logger.log({type:"error",title:"memcached",data:err});
            }
        });


    },
    /**@deprecated**/
    _dataToMem:function(key,dataFunction,callback)
    {

        memjsClient.get(key,function(err,val){

            if(!err && val)
            {



                callback(val.toString());


            }
            else if(!val)
            {


                console.log("writing to memory...");
                dataFunction(memjsClient,callback,key);









            }
            else if(err)
            {

                callback(val.toString());
                logger.log({type:"error",title:"memcached",data:err});
            }
        });


    },

    getFromMem: function (key,callback) {
        memjsClient.get(key,function(err,val){

            if(!err && val)
            {



                if(callback)
                {
                    callback(val.toString());
                }



            }
            else if(!val)
            {
                if(callback) {
                    callback(false);
                }
            }
       });
    }
    ,
    /**
     *
     *
     * @param key
     * @param value
     * @param expiration
     * @param callback - Callback que recibe como parametro un string con los datos sacados de la RAM
     */
    dataToMem:function(key,value,expiration,overwriteOlder,callback)
    {

        value = JSON.stringify(value);


        console.log("getting from memory...");


        if(!overwriteOlder)
        {
            memjsClient.get(key,function(err,val){

                if(!err && val)
                {



                    if(callback)
                    {
                        callback(val.toString());
                    }



                }
                else if(!val)
                {
                    console.log("setting to memory...");
                    memjsClient.set(key,value,function(err, val) {

                        if(val && !err)
                        {
                            if(callback) {
                                callback(value.toString());
                            }
                        }

                    }, expiration);










                }
                else if(err)
                {

                    if(callback)
                    {
                        callback(val.toString());
                    }

                    logger.log({type:"error",title:"memcached",data:err});
                }
            });

        }
        else
        {
            console.log("setting to memory... (overwrite mode)");


            memjsClient.set(key, new Buffer(value),function(err, val) {

                if(val && !err)
                {
                    if(callback) {
                        callback(value.toString());
                    }
                }

            }, expiration);



        }








    },

    delete: function (key,callback) {

          memjsClient.delete(key,callback);

    }






}


/*
EJEMPLO DE USO

 cacheManager.dataToMem(key,function(memjs,callback){

 var data= ACA VA LO QUE QUERAMOS GUARDAR EN MEMORIA ;

 memjs.add(key,data,function(){},10);

 callback(data.toString());

 },
 function(data)
 {
 res.send(data);
 }

 );
 */