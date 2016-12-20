/**
 * Created by Luis Garcia on 19/12/2016.
 */
'use strict';

var jwt = require('jsonwebtoken');
var Config = require('../classes/Config');
module.exports=class Core
{
    constructor(server,secret)
    {

        this.server=server;
        this.secret = secret;
        this.set();

    }

    getSubdomain(req)
    {

            var domain = req.headers.host,
                subDomain = domain.split('.');

            if(subDomain.length >1){
                subDomain = subDomain[0].split("-").join(" ");
            }else{
                subDomain = "default";
            }

           return subDomain;
    }
    
    
    set()
    {
        var self =this;
        this.server.use(function (req,res,next) {


            global.language= self.getSubdomain(req);
   
            global.config = new Config(language);
            

            var Cookies = require('cookies');
            var cookies = new Cookies(req,res);

            var token=cookies.get("access_token");


            jwt.verify(token,self.secret,function(err,result){

                if(!err)
                {

                    res.locals.user = result._id;
                }


                next();
            });




        });
    }

}