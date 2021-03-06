/**
 * Created by Luis Garcia on 19/12/2016.
 */
'use strict';


var mongodb = require("mongodb");

var  MongoClient=mongodb.MongoClient;


module.exports = class Connection
{
    constructor(url,db,port,user,pass)
    {
        if(!user || !pass)
        {
            this.connectionUrl='mongodb://'+url+':'+port+'/'+db;

        }
        else {

            this.connectionUrl='mongodb://'+user+':'+pass+'@'+url+':'+port+'/'+db;
        }

    }

    connect(col,callback)
    {
        MongoClient.connect(this.connectionUrl,function(err,db){


            if(err)
            {
                throw err;
            }
            else
            {
                var collection  = db.collection(col);


                if(callback)
                {
                    callback(collection);
                }
            }
        })
    }

    create(obj,collection,callback){
        this.connect(
            collection,
            function(collection)
            {

               if(!obj.length)
               {
                   collection.insertOne(obj,function(err,res){

                       if(err)
                       {
                           throw err;
                       }

                       callback(res.ops[0]);


                   });
               }
                else
               {

                   collection.insertMany(obj,function(err,res){

                       if(err)
                       {
                           throw err;
                       }

                       callback(res.ops);



                   });

               }



            }
        );

    }
    read(obj,collection,callback,limit,skip){

        if(!limit)
        {
            limit=0;
        }
        if(!skip)
        {
            skip=0;
        }
        if(obj._id)
        {
            obj._id= new ObjectID(obj._id.toString());
        }
        this.connect(
            collection,
            function(collection)
            {

                collection.find(obj).limit(limit).skip(skip).toArray(function(err,res){

                    if(err)
                    {
                        throw err;
                    }

                    var pages=1;

                    if(limit>0)
                    {
                         pages = Math.ceil(res.length/limit);
                    }

                    var result={data:res,pages:pages};

                    /*if(res.length==1)
                    {
                        res=res[0];
                    }*/

                    callback(result);


                });


            }
        );

    }
    update(obj,newObj,collection,options,callback){
        if (obj._id) {
            obj._id = new ObjectID(obj._id.toString());
        }
        this.connect(
            collection,
            function (collection) {

                collection.updateMany(obj,newObj,options,function(err,res){


                    if(err)
                    {
                        throw err;
                    }
        
                    if(res.length==1)
                    {
                        res=res[0];
                    }
                    callback(res);

                });
            });
    }
    delete(obj,collection,callback){
        if (obj._id) {
            obj._id = new ObjectID(obj._id.toString());
        }
        this.connect(
            collection,
            function (collection) {


                collection.deleteMany(obj,function(err,res){

                    if(err)
                    {
                        throw err;
                    }

                    if(res.length==1)
                    {
                        res=res[0];
                    }
                    callback(res);

                });







            });

    }


}