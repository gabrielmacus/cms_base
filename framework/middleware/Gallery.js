/**
 * Created by Gabriel on 03/01/2017.
 */
"use strict";
module.exports=class Gallery {

    constructor(server,connection,resultsLimit)
    {
        if(!resultsLimit)
        {
            this.resultsLimit=0;
        }
        else
        {
            this.resultsLimit = resultsLimit;
        }
        this.server= server;
        this.connection =connection;
        this.set();
    }
    
    set()
    {
        var self =this;
        this.server.get('/galeria',function (req,res) {
            
            var p = req.query.p;
            if(!p)
            {
                p=0;
            }

            p=(parseInt(p)-1);
            self.connection.read( {},'galeria',function (result) {

               res.send(result);
            },self.resultsLimit,p);

            
        });
    }
}