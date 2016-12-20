/**
 * Created by Luis Garcia on 19/12/2016.
 */

var jwt = require('jsonwebtoken');

module.exports=class Core
{
    constructor(server,secret)
    {

        this.server=server;
        this.secret = secret;
        this.set();

    }

    set()
    {
        var self =this;
        this.server.use(function (req,res,next) {

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