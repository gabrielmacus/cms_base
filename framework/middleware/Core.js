/**
 * Created by Luis Garcia on 19/12/2016.
 */
'use strict';

var jwt = require('jsonwebtoken');
var Config = require('../classes/Config');
var HTML =require('../classes/HTML');
module.exports=class Core
{
    constructor(server,secret)
    {

        this.server=server;
        this.secret = secret;
        this.set();

        this.server.get('/:path',this.processGet);
        this.server.get('/',this.processGet);



    }
    processGet(req,res){



        if(req.params) {
            var path = req.params.path;
            if(!path)
            {
                path='index'
            }
        }
        else
        {
            path='index';
        }


            var html = new HTML(language,path,{},res);

            res.send(html.code);




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
        this.server.get('/css/:file',function(req,res)
        {
            var param = req.params.file
            res.sendFile(process.cwd()+'/css/'+param);

        });
        this.server.get('/controller/:file',function(req,res)
        {
            var param = req.params.file;
                res.sendFile(process.cwd()+'/controller/'+param);



        });
        this.server.get('/img/:file',function(req,res)
        {
            var param = req.params.file
            res.sendFile(process.cwd()+'/img/'+param);

        });


        this.server.get('/js/:file',function(req,res)
        {
            var param = req.params.file
            res.sendFile(process.cwd()+'/js/'+param);

        });

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