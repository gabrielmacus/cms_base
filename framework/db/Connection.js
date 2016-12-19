
"use strict";
module.exports=class Connection
{




    constructor(address,port,db,user,pass)
    {
        this.address=address;
        this.port= port;
        this.db =db;
        this.user =user;
        this.pass =pass;

        this.mongodb= require("mongodb");

        this.MongoClient=this.mongodb.MongoClient;


    }
    getUrl()
    {

        if(this.db && this.pass)
        {

            return 'mongodb://'+this.user+':'+this.pass+'@'+this.address+':'+this.port+'/'+this.db;
        }
        else
        {
            return 'mongodb://'+this.address+':'+this.port+'/'+this.db;
        }

    }
    connect(callback)
    {

        this.MongoClient.connect(this.getUrl(), function (err, db) {

            if (err) {



                throw err;
            } else {
                //HURRAY!! We are connected. :)

                if(callback)
                {
                    callback(db);
                }




            }});

    }
    process(err, result,callback,db)
    {
        if (err) {
            throw  err;
        } else {

            if(callback)
            {
                callback(result);

            }
            db.close();


        }
    }
    insert (obj,col,callback)
    {

        var self=this;
        this.connect(function (db) {


            var collection = db.collection(col);


            if (!obj.length) {


                collection.insertOne(obj,function (err, result) {



                    self.process(err, result, callback, db);
                });
            }
            else {
                collection.insertMany(obj,function (err, result) {
                    self.process(err, result, callback, db);
                });


            }
        });


    }
    find(obj,col,callback)
    {


        var self=this;
        this.connect(function (db) {


            var collection = db.collection(col);

            collection.find(obj).toArray(function (err, result) {

                self.process(err, result, callback, db);
            });






        });

    }
    update(obj,newObj,col,config,callback)
    {

        var self=this;
        this.connect(function (db) {


            var collection = db.collection(col);

            if (!obj.length) {

                if(obj._id)
                {
                    obj._id = new ObjectID(obj._id.toString());
                }


                
                collection.updateOne(obj,newObj,config,function (err, result) {


                    
 

                    self.process(err, result, callback, db);
                });

            }
            else {


                collection.updateMany(obj,newObj,config,function (err, result) {


                    self.process(err, result, callback, db);
                });


            }
        });


    }
    remove(obj,col,callback)
    {

        var self=this;
        this.connect(function (db) {

            var collection = db.collection(col);

            if(obj._id)
            {
                obj._id=new ObjectID(obj._id);
            }

                collection.deleteMany(obj,function (err,result) {
                    self.process(err, result, callback, db);
                });

        });



        }
    
    
    
    


}