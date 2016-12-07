/**
 * Created by Gabriel on 15/09/2016.
 */
var logger=require('./log');
var mongodb= require("mongodb");
var jsonQuery = require('json-query');

var cacheman = require('./cachemanager');

var  MongoClient=mongodb.MongoClient;
var mongodUrl;
cacheman.startServer("localhost",11211);
function setUrl()
{
    if(config.db.user&&config.db.password)
    {

         mongodUrl='mongodb://'+config.db.user+':'+config.db.password+'@'+config.db.address+':'+config.db.port+'/'+config.db.name;
    }
    else
    {
         mongodUrl='mongodb://'+config.db.address+':'+config.db.port+'/'+config.db.name;
    }
}

module.exports=
{



// Connection URL. This is where your mongodb server is running.

    getAll:function (colName,callback)
{


    setUrl();

    cacheman.getFromMem(colName,function(data){


    if(!data)
    {
        // Use connect method to connect to the Server
        MongoClient.connect(mongodUrl, function (err, db) {
            if (err) {

                logger.log({type:"error",error:err});
            } else {
                //HURRAY!! We are connected. :)






                var collection  = db.collection(colName);

                collection.find({}).toArray(function (err, result) {
                    if (err) {
                        logger.log({type:"error",error:err});
                    } else {

                        cacheman.dataToMem(colName,result,86400,true);


                        if(!err)
                        {
                            callback(result,null);
                        }
                        else
                        {
                            callback(false,err);
                        }


                    }
                    //Close connection
                    db.close();
                });













            }
        });
    }
        else
    {
        console.log("was in memory");
        callback(JSON.parse(data));
    }


});














},


    join:function(obj,colName,callback) {



        setUrl();




        // Use connect method to connect to the Server
        MongoClient.connect(mongodUrl, function (err, db) {
            if (err) {

                logger.log({type:"error",error:err});
            } else {
                //HURRAY!! We are connected. :)

                var collection  = db.collection(colName);


                collection.agg
                collection.aggregate(obj).toArray(function (err, result) {
                    if (err) {
                        logger.log({type:"error",error:err});
                    } else {


                        if(result.length>0)
                        {
                            callback(result,null);
                        }
                        else {
                            callback(null,err);
                        }




                    }
                    //Close connection
                    db.close();
                });





            }
        });



    }
    ,
    update:function(obj,updateObj,colName,callback,upsert)
    {

        if(upsert)
        {var config=
            {upsert:true,
                multi:true};
        }

        setUrl();


        // Use connect method to connect to the Server
        MongoClient.connect(mongodUrl, function (err, db) {
            if (err) {

                logger.log({type:"error",error:err});
            } else {
                //HURRAY!! We are connected. :)

                var collection  = db.collection(colName);





                if(!obj.length)
                {




                    collection.updateOne(obj,updateObj,config, function (err, result) {
                        if (err) {
                            logger.log({type:"error",error:err});
                        } else {



                            if(callback)
                            {
                                callback(result,err);
                            }
                            db.close();
                            /*
                            collection.find({}).toArray(function (err, result) {
                                if (err) {
                                    logger.log({type:"error",error:err});
                                } else {

                                    cacheman.dataToMem(colName,JSON.stringify(result),86400,true);



                                }
                                if(callback)
                                {
                                    callback(err,result);
                                }
                                //Close connection
                                db.close();
                            });*/







                        }
                    });
                }
                else {





                    collection.updateMany(obj,updateObj,config, function (err, result) {
                        if (err) {
                            logger.log({type: "error", error: err});
                        } else {



                            if(callback)
                            {
                                callback(result,err);
                            }
                            db.close();
                            /*
                            collection.find({}).toArray(function (err, result) {
                                if (err) {
                                    logger.log({type: "error", error: err});
                                } else {

                                    cacheman.dataToMem(colName, JSON.stringify(result), 86400, true);


                                }

                                if(callback)
                                {
                                    callback(err,result);
                                }
                                //Close connection
                                db.close();
                            });

                            */

                        }
                    });








                }



            }
        });

    }

    ,
    insert:function (obj,colName,callback)
{


    setUrl();


    // Use connect method to connect to the Server
    MongoClient.connect(mongodUrl, function (err, db) {

        if (err) {

            logger.log({type:"error",error:err});
        } else {
            //HURRAY!! We are connected. :)

            var collection  = db.collection(colName);





            if(!obj.length)
            {

                collection.insertOne(obj, function (err, result) {
                    if (err) {
                        logger.log({type:"error",error:err});
                    } else {

                        if(callback)
                        {
                            callback(result,err);
                            db.close();
                        }

                        /*
                        collection.find({}).toArray(function (result,err) {
                            if (err) {
                                logger.log({type:"error",error:err});
                            } else {

                                cacheman.dataToMem(colName,JSON.stringify(result),86400,true);



                            }
                            if(callback)
                            {
                                console.log(err);

                                    callback(result,err);



                            }
                            //Close connection
                            db.close();
                        });*/







                    }
                });
            }
            else {




                    collection.insertMany(obj, function (err, result) {
                        if (err) {
                            logger.log({type: "error", error: err});
                        } else {

                            if(callback)
                            {
                                callback(result,err);
                                db.close();
                            }
                            db.close();
                            /*
                            collection.find({}).toArray(function (err, result) {
                                if (err) {
                                    logger.log({type: "error", error: err});
                                } else {

                                    cacheman.dataToMem(colName, JSON.stringify(result), 86400, true);


                                }

                                if(callback)
                                {
                                    console.log(err);

                                    callback(result,err);



                                }
                                //Close connection
                                db.close();
                            });
                            */

                        }
                    });








            }



        }
    });
},
    find:function(obj,colName,callback) {



        setUrl();




                // Use connect method to connect to the Server
                MongoClient.connect(mongodUrl, function (err, db) {
                    if (err) {

                        logger.log({type:"error",error:err});
                    } else {
                        //HURRAY!! We are connected. :)

                        var collection  = db.collection(colName);





                        collection.find(obj).toArray(function (err, result) {
                            if (err) {
                                logger.log({type:"error",error:err});
                            } else {


                                if(result.length>0)
                                {
                                    callback(result,null);
                                }
                                else {
                                    callback(null,err);
                                }




                            }
                            //Close connection
                            db.close();
                        });





                    }
                });



    }

}