/**
 * Created by Luis Garcia on 20/12/2016.
 */

var MD5 = require("crypto-js/md5");
var Cookies = require('cookies');
var jwt = require('jsonwebtoken');
var Connection = require('../db/Connection');

module.exports=function(app,connection,secret)
{

    function register(req,res)
    {

        var user =req.body;
        if(user.password)
        {
            user.password= MD5(user.password).toString();
        }

        connection.create(user,'usuarios', function () {

            res.send(true);
        })

    }

    function login(req,res)
    {

        var cookies = new Cookies(req,res);

        cookies.set('access_token',null);
        var user={$or:[{username:req.body.username},{email:req.body.username}],password:MD5(req.body.password).toString()};

        connection.read(user,"usuarios", function (response) {



            if(response.length==0)
            {
                res.send(false);

            }
            else
            {
                delete response.password;

                var token = jwt.sign(response,secret,{
                    expiresIn : 86400 // expires in 24 hours
                });
                res.locals.user=response._id;

                cookies.set('access_token',token,{ httpOnly: false,path:'/'} );

                res.send(true);
            }


        });


    }

    function logout(req,res)
    {
        var cookies= new Cookies(req,res);

        cookies.set("access_token",null);

        res.send(true);
    }

    function edit(req,res) {

        var id=res.locals.user;
        if(id)
        {
            var db=config.db;
            var connection = new Connection(db.url,db.db,db.port);
            var user = req.body;

            connection.update({_id:id},{$set:user},'usuarios',null,function (result) {

                res.send(true);


            });
        }
        else
        {
            res.send(false);
        }


    }
    app.post('/register',register);

    app.post('/login',login);

    app.get('/logout',logout);
    app.post('/edit-user',edit)

}