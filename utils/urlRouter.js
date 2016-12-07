var pug = require('./pugrendering');
var fs = require('fs');

var componentReader = require("./componentReader");

/*
*
* La variable notIgnore sirve para indicar que urls debemos procesar como template
 */

var notIgnore=["index","login","register","profile","publish"];
var resources=["scripts","images"];


app.use(function(req, res, next) {



    var cookies = new Cookies(req,res);
    global.token =cookies.get("access_token")||(req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];



//https://github.com/pillarjs/cookies

        var url =req.url;

        var split =url.split("/");

        var mainDir =split[1];

        if(mainDir==""|| !mainDir || mainDir==192)
        {
            mainDir="index";
            url ="/index";
        }

        handleRedirect(req,res,mainConfig);

        if(notIgnore.indexOf(mainDir)>-1 && req.method =="GET")
        {





            global.config=JSON.parse(fs.readFileSync("./views/websites/"+website+"/config/"+componentReader.getLanguage(req)+"/config.json"));

            jwt.verify(token, mainConfig.secret, function(err, decodedToken) {


                if(!err)
                {
                    console.log(decodedToken);



                    url ="/websites/"+mainConfig.name+"/login"+url;



                }
                else
                {
                    url ="/websites/"+mainConfig.name+"/logout"+url;
                }







                getUserData(token, function (result) {

                    console.log(result);
                    componentReader.readComponents(mainDir,req);
                    body.user= JSON.stringify(result);
                    console.log(url);
                    pug.renderFile(url+".pug",{body:body},res);





                });
            });

























        }
        else if(resources.indexOf(mainDir)>-1 && req.method =="GET")
        {

            switch (mainDir)
            {


                case "images":
                    var file= process.cwd()+"/views/websites/"+website+"/"+req.url;


                            res.sendFile(file);
                    break;
                default:
                    jwt.verify(token, mainConfig.secret, function(err, decodedToken) {

                        if(!err)
                        {
                            var file= process.cwd()+"/views/websites/"+website+"/login"+req.url;
                        }
                        else
                        {         var file= process.cwd()+"/views/websites/"+website+"/logout"+req.url;

                        }


                        res.sendFile(file);

                    });
                    break;
            }






        }
        else
        {

            next();
        }










});

function handleRedirect(req,res,config) {
    if(req.url.indexOf("confirm")>-1 ||req.url.indexOf("login")>-1 )
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
        res.header("Location", index);

    }
}

