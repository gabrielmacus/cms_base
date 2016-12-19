/**
 * Created by Gabriel Macus on 18/12/2016.
 */



/**
 * Created by Gabriel on 15/09/2016.
 */

var mongodb= require("mongodb");


var  MongoClient=mongodb.MongoClient;
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
    console.log(mongodUrl);
}

module.exports=function (address,port,db,user,pass)
{
    this.db=db;
    this.user =user;
    this.pass =pass;
    this.address = address;
    this.port =port;

    var mongodUrl;

    function init()
    {
        if(db && pass)
        {

            mongodUrl='mongodb://'+user+':'+pass+'@'+address+':'+port+'/'+db;
        }
        else
        {
            mongodUrl='mongodb://'+address+':'+port+'/'+db;
        }
    }

    init();

    function connect(callback)
    {
        MongoClient.connect(mongodUrl, function (err, db) {

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


    function process(err, result,callback)
    {
        if (err) {
            throw  err;
        } else {

            if(callback)
            {
                callback(result,err);
                db.close();
            }



        }
    }

    this.insert=function (obj,col,callback)
    {
        connect(function (db) {


            var collection  = db.collection(col);

            if(!obj.length)
            {

                collection.insertOne(obj, process,callback);
            }
            else
            {
                collection.insertMany(obj,process,callback);
            }


        });


    }

    this.insert=function (obj,col,callback)
    {
        connect(function (db) {


            var collection  = db.collection(col);

            if(!obj.length)
            {

                collection.insertOne(obj, process,callback);
            }
            else
            {
                collection.insertMany(obj,process,callback);
            }


        });


    };
        this.update=function(obj,newObj,col,callback,upsert)
       {

    if(upsert)
    {var config=
    {upsert:true,
        multi:true};
    }


    connect(function (db) {




                var collection  = db.collection(col);

                if(!obj.length)
                {




                    collection.updateOne(obj,newObj,config,process,callback);
                }
                else {



                    collection.updateMany(obj,newObj,config,process,callback);



                }




    });




};

}
