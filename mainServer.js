/**
* Created by Gabriel Macus on 18/12/2016.
*/
var async = require('async');
var ObjectID = require('mongodb').ObjectID;
var Connection =class Connection
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


}



var Core=class Core
{



    constructor(callback,id,connection) {
        this.col =  this.constructor.name.toLowerCase();
        this.connection=connection;
        var self =this;

        if(!id)
        {
            this.connection.insert(this,this.col,function(res,err){

                self._id=  new ObjectID(res.ops[0]._id);

                if(err)
                {

                    throw err;
                }

                if(callback)
                {
                    callback();
                }

            })
        }
        else
        {


            this.get(id,callback);
        }

    }

    get(id,callback)
    {

        var result;
        async.series([

            function(next)
            {
                this.connection.find({_id:new ObjectID(id.toString())},this.col,
                    function (res) {


                        result=res;

                    }

                )
            },
            function(next)
            {


//                this=result;

                if(callback)
                {
                    callback();
                }

                next();

            }

        ]);

    }



}
var MD5 = require("crypto-js/md5");


var connection = new Connection('localhost',27017,'db');
var core = new Core(function(){},null,connection);


var user;
async.series([
    function(next) {


         /*user= new User('gabiMcs','gabrielmacus@gmail.com','powersoccer',function(){

             next();

         });*/
    },function(next) {


        console.log(user);




        next();
    }
], function (err, result) {








});
/*async.waterfall([
    function(callback) {
        var user= new User('gabiMcs','gabrielmacus@gmail.com','powersoccer');

        callback(user)
    },
    function(user) {
        console.log(user);
    }
]);*/