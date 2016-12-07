
var fs = require("fs");

module.exports=
{
     readComponents:function(site,req,callback) {
         var body = {};


         var idioma = this.getLanguage(req);

         var path = process.cwd() + "/views/websites/" + website + "/config/" + idioma + '/';


         var dirPath = path + site;
         if (fs.lstatSync(dirPath).isDirectory())//chequeo si estoy leyendo un archivo o un directorio
         {

             var dirFilenames = fs.readdirSync(dirPath);

             dirFilenames.forEach(function (dirFilename) {


                 processComponents(dirFilename, site);

             });

             var commonFilenames = fs.readdirSync(path + "common");

             commonFilenames.forEach(function (commonFilename) {

                 processComponents(commonFilename, "common");

             });


         }

         function processComponents(filename, site) {
             var ext = filename.split(".");

             ext = ext[ext.length - 1];


             var item = JSON.parse(fs.readFileSync(path + site + "/" + filename, 'utf8'));


             switch (ext) {
                 case "navbar":

                     if (!body.navbars) {
                         body.navbars = {};
                     }

                     body.navbars[item.id] = item;
                     break;
                 case "form":

                     if (!body.forms) {
                         body.forms = {};
                     }
                     body.forms[item.id] = item;

                     break;
                 case "profile":
                     if (!body.profiles) {
                         body.profiles = {};
                     }
                     body.profiles[item.id] = item;

                     break;
             }

         }


         body.config = JSON.stringify(config);
         body.root = mainConfig.index;
         body.imageServer = mainConfig.imageServer;

         global.body = body;
         if (callback) {
             getUserData(token, function (result) {

                 if (result) {
                     body.user = JSON.stringify(result);
                     console.log(result);

                 }

                 callback();

             })
         }
         else {
             return body;
         }
         //para luego parsearlo y usarlo de lado del cliente


     }

,
    getLanguage:function(req)
    {

        var idioma = subdomain.handleSubdomain(req.headers.host);


        if(!idioma || !isNaN(idioma))
        {
            idioma="es";
        }

        return idioma;
    }
}