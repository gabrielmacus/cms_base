var validations = require("./validations");
var mailer = require("./mailer");
var MD5 = require("crypto-js/md5");
var pug = require('./pugrendering');
var fs = require('fs');
var uploads =require("./uploads");
var tokens={};
var usernameConfig={maxLength:20,minLength:3,allowedSpecialChars:"-_."};
var passwordConfig = {maxLength:100,minLength:5,allowedSpecialChars:'\'-*-.@()#"',allowedSpecialAdjacent:true,lastSpecialAllowed:true,firstSpecialAllowed:true};
var utilities = require('./utilities');
var nameConfig = {maxLength:60,minLength:2,numbers:false,allowedSpecialChars:" '´`"};
var componentReader = require("./componentReader");

app.post("/avatar",function(req,res){

    var cookies= new Cookies(req,res);

    var token =cookies.get("access_token")||(req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];



    jwt.verify(token, mainConfig.secret, function(err, decodedToken) {

        var path="/views/websites/"+mainConfig.name+"/images/"+decodedToken._id;
        if(!err){
            uploads.upload(path,res,req,function (result) {



                var avatar=result[0].url;

                var _avatar = avatar.split("/");

                avatar="";
                var pathEncountered;
                for(var i=0;i<_avatar.length;i++)
                {

                    if(_avatar[i]=="images"|| pathEncountered)
                    {
                        

                        avatar+="/"+_avatar[i];
                        pathEncountered=true;
                    }

                }



                console.log();

                    mongod.update({_id:new ObjectID(decodedToken._id)},{$set :{avatar:avatar}},"usuarios",function (result) {

                        if(result)
                        {
                            res.send(avatar);
                        }
                        else
                        {
                            res.send(false);
                        }

                    });


            });

        }
        else
        {

            res.statusCode=404;
            res.end();
        }

    });


    });

app.get("/test", function (req,res) {

    mongod.update({user_id:new ObjectID("58426f736f77ec0d0055da39"),"date":new Date().toLocaleDateString()},{ $inc:{"views":1},$set:{"date":new Date().toLocaleDateString()}},"stats",function(res,err){

        console.log(err);
        console.log(res);
    },true);
})
app.get("/user/:user",function(req,res){

    var user =req.params.user;



    mongod.find({username:user},"usuarios", function (result,err) {


        if(result)
        {

          componentReader.readComponents("user",req,function()
           {
               body._user = result[0];


               var cookies = new Cookies(req,res);
               var token =cookies.get("access_token")||(req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

               jwt.verify(token, mainConfig.secret, function(err, decodedToken) {



                   if(!err)
                   {
                       var url=url ="/websites/"+mainConfig.name+"/login/user";

                       if(decodedToken.username!=user)
                       {
                           mongod.update({user_id:new ObjectID(result[0]._id),"date":new Date().toLocaleDateString()},{ $inc:{"views":1},$set:{"date":new Date().toLocaleDateString()}},"stats",function(res,err){

                           },true);
                       }

                   }
                   else{

                       mongod.update({user_id:new ObjectID(result[0]._id),"date":new Date().toLocaleDateString()},{ $inc:{"views":1},$set:{"date":new Date().toLocaleDateString()}},"stats",function(res,err){

                       },true);

                       var url=url ="/websites/"+mainConfig.name+"/logout/user";
                   }
                   pug.renderFile(url+".pug",{body:body},res);



               });
           });










        }
        else
        {
            res.statusCode=404;
            res.end();
        }
    })

});
app.post("/edit-user",function(req,res){
    var cookies= new Cookies(req,res);

    var token =cookies.get("access_token")||(req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    var user = req.body;


    jwt.verify(token, mainConfig.secret, function(err, decodedToken) {

        if(!err)
        {
          var report=[];

          var notEmpty=false;





            if(user["username"])
            {

                notEmpty=true;
                var validUsername=validations.isValidString(user.username,usernameConfig);

                if(validUsername!==true)
                {


                    report.push({prop:"username",data:validUsername});

                }

            }
            if(user["name"])
            {  notEmpty=true;
                var validName = validations.isValidString(user.name,nameConfig);

                if(validName!==true)
                {


                    report.push({prop:"name",data:validName});


                }

            }
            if(user["surname"])
            {
                notEmpty=true;
                var validSurname = validations.isValidString(user.surname,nameConfig);
                if(validSurname!==true)
                {


                    report.push({prop:"surname",data:validSurname});


                }
            }
            if(user["email"])
            {  notEmpty=true;
                var validEmail =  validations.isValidEmail(user.email);
                if(!validEmail){

                    report.push({prop:"email",notValid:true});


                }

            }
            if(user["sex"])
            {
                notEmpty=true;
                if(user.sex!='m'&&user.sex!='f')
                {
                    report.push({prop:"sex",notValid:true});
                }


            }





            if(report.length==0 && notEmpty)
            {

                mongod.update({_id:new ObjectID(decodedToken._id)},{$set:user},"usuarios",function(result,err){

                    if(result)
                    {

                        res.send(true);
                    }
                    else
                    {
                        res.send(false);
                    }


                });
            }
            else
            {
                res.send(report);
            }
        }
        else
        {
            res.send(false);
        }

    });


});
app.post("/user-data",function(req,res)
{    var cookies= new Cookies(req,res);

    var token =cookies.get("access_token")||(req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    getUserData(token,function(result){

        if(result)
        {
            res.send(result);

        }
        else
        {
            res.statusCode=404;
            res.end();
        }

    });

});

global.getUserData=function(token,callback)
{
    jwt.verify(token, mainConfig.secret, function(err, decodedToken) {

        if(!err)
        {
            mongod.join(
                [{$lookup:{"from":"stats","localField":"_id","foreignField":"user_id","as":"stats"}},
                    {
                        $match: {_id: new ObjectID(decodedToken._id)}
                    }



                ]


        ,"usuarios",function(result){

                console.log("JOIN HERE");

                console.log(result);

                if(result)
                {

                    var user =result[0];
                    user.views = utilities.sum(user.stats,"views");
                    callback(user);



                }
                else
                {
                    callback(false);

                }
            });
        }
        else
        {
            callback(false);

        }

    });
}






app.post('/register', function (req, res) {

    var user=req.body;
    registerUser(user,function(e){

        res.send(e);


    });



});

app.get("/confirm/:hash",function(req,res){

    var idioma = subdomain.handleSubdomain(req.headers.host);

    if(!idioma || idioma==192)
    {
        idioma="es";
    }

    global.config=JSON.parse(fs.readFileSync("./views/websites/"+website+"/config/"+idioma+"/config.json"));
    var cookies= new Cookies(req,res);

    var hash = req.params.hash;
    mongod.find({"confirmCode":hash},"usuarios",function(result){


       if(result)
       {
           var user= result[0];
           user.confirmed=true;
           delete user.confirmCode;
           mongod.update({_id:user._id},user,"usuarios",function(result,err){


               if(!err)
               {

                   cookies.set( "successmsg",   config.messages.success.userConfirmation, { httpOnly: false } );



               }
               else{
                   cookies.set( "errormsgmodal",  config.messages.error.unknownError, { httpOnly: false } );

               }


               res.statusCode = 302;

               res.end();


           });

       }
        else
       {

           cookies.set( "errormsgmodal", config.messages.error.userConfirmation, { httpOnly: false } );


           res.statusCode = 302;

           res.end();
       }

/*
        console.log(index);
        return res.redirect(index);
*/



    });



});

app.get("/logout",function(req,res){

    var cookies = new Cookies(req,res);

    cookies.set("access_token",null);

    console.log("logged out");
    res.header("Location", "/");


    res.statusCode = 302;

        res.end();



});






app.post("/login",function(req,res){

    var cookies= new Cookies(req,res);

 var password= MD5(req.body.password).toString();

    mongod.find({$or : [ { "username" : req.body.username }, {"email": req.body.username } ],password:password,confirmed:true},'usuarios',function(result,err){


        if(result)
        {

            if(!err)
        {
            //guardar solo el nombre de usuario y/u otros datos,excepto la contraseña,debido a que se almacena en base64 y puede ser decodificado
            var token = jwt.sign({_id:result[0]._id,username:req.body.username}, mainConfig.secret, {
                expiresIn : 86400 // expires in 24 hours
            });

            cookies.set('access_token',token,{httpOnly:false,overwrite:true});

            var user = {
                agent: req.headers['user-agent'], // User Agent we get from headers
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,// Get IP - allow for proxy
                username:req.body.username
            };


            var index;
            if(config.index)
            {


                index=config.index;
            }

            else
            {

                index = config.domain;

            }



            res.statusCode = 302;
            res.end();





            /*
            mongod.insert({token:token,fecha:new Date(),user:user},"tokens",function(result,err){




                if(!err)
                {
                    var index;
                    if(config.index)
                    {


                        index=config.index;
                    }

                    else
                    {

                        index = config.domain;

                    }



                    res.statusCode = 302;
                    res.end();


                }
                else
                {

                    res.header("Location", "/login");
                    cookies.set('errormsgmodal',config.messages.error.unknownError, { httpOnly: false });

                    res.statusCode = 302;
                    res.end();

                }




            });

*/








            //console.log({success:true,token:token});

        }
        else
        {
            res.header("Location", "/login");
            cookies.set('errormsgmodal',config.messages.error.unknownError, { httpOnly: false });

            res.statusCode = 302;
            res.end();

        }

        }
        else
        {
            res.header("Location", "/login");

            cookies.set('errormsgmodal',config.messages.error.userLogin, { httpOnly: false });

            res.statusCode = 302;
            res.end();

        }


    });




});


var registerUser= function (user,callback) {

        try
        {
            var valid=true;


            var validUsername=validations.isValidString(user.username,usernameConfig);
            var  validPassword= validations.isValidString(user.password,passwordConfig);
            var validEmail =  validations.isValidEmail(user.email);
            var validName = validations.isValidString(user.name,nameConfig);
            var validSurname = validations.isValidString(user.name,nameConfig);
            var report=[];


            console.log(user);
            if(!user.sex || user.sex=="")
            {
                valid=false;

                report.push({prop:"gender",notValid:true});
            }

            if(validName!==true)
            {


                report.push({prop:"name",data:validName});
                valid=false;

            }
            if(validSurname!==true)
            {


                report.push({prop:"surname",data:validSurname});
                valid=false;

            }

            if(validUsername!==true)
            {


                report.push({prop:"username",data:validUsername});
                valid=false;
            }
            if(validPassword!=true)
            {


                report.push({prop:"password",data:validPassword});
                valid=false;
            }
            if(!validEmail){

                report.push({prop:"email",notValid:true});

                valid=false;
            }





            if(user.password!==user.repeatPassword)
            {


                report.push({prop:"password",notMatch:true});

                valid=false;

            }

            if(user.email!==user.repeatEmail)
            {
                report.push({prop:"email",notMatch:true});
                valid=false;
            }


            if(valid===true)
            {

                user.password= MD5(user.password).toString();
                user.fechaCreacion = new Date();
                user.fechaModificacion = new Date();

                delete user.repeatPassword;
                delete user.repeatEmail;

                console.log(user);

                mongod.insert(user,"usuarios",function(result,e){

                    console.log(e);

                    if(!e)
                    {



                        var hashId=MD5(user._id).toString();
                        user.confirmCode=hashId;




                        mongod.update({_id:user._id},user,"usuarios",function(result,err){


                            console.log(err);

                            if(!err)
                            {


                                var html= pug.renderFile("/mails/registerConfirm.pug",{username:user.username,website:mainConfig.domain,name:mainConfig.name,hash:hashId});



                                mailer.sendMail(html,user.email,mainConfig.name+"<"+config.emailAddress+">","Confirmar registro en "+mainConfig.name,callback);


                            }
                            else
                            {
                                callback(false);

                            }

                        });







                    }
                    else
                    {
                        callback(false);
                    }


                });
            }
            else
            {

                    callback(report);

            }

        }
        catch (e)
        {
            if(callback)
            {
                callback(false);
            }
        }



        
    }
    
