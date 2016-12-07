


var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    path=require('path'),
    app2 = express();
var pug = require('./utils/pugrendering');
var cfg =  {

    // providing server with  SSL key/cert
    key: fs.readFileSync("./certificates/private.key"),
    cert: fs.readFileSync("./certificates/certificate.crt")

};

https.createServer(cfg, app2).listen(443);
//https.createServer(app2).listen(443);


app2.set('view engine', 'pug');



app2.get('/js/:file',function(req,res){

    res.sendFile(__dirname+"/js/"+req.params.file);
});

app2.get('/css/:file',function(req,res){


    res.sendFile(__dirname+"/css/"+req.params.file);
});


app2.get('/testing',function(req,res){

    req.send("OK 200");

});


app2.get('/',function(req,res){

    pug.renderFile("security.pug",null,res);

});

app2.get('/client',function(req,res){

    pug.renderFile("security_client.pug",null,res);

});

/*


 app.get('/', function (req, res) {
 res.header('Content-type', 'text/html');
 return res.end('<h1>Hello, Secure World!</h1>');
 });

 */


var httpServ =  require('https');










var processRequest = function( req, res ) {

    res.writeHead(200);

};


var  app = httpServ.createServer(cfg, processRequest ).listen( 80 );

var io = require("socket.io").listen(app);



io.sockets.on('connection',onConnection);



var sockets={};

var transmisiones=[];

function onConnection(socket)
{

    socket.on("login", function () {
        sockets[socket.id]={socket:socket};

        sockets[socket.id].socket.emit("msg",{type:0,data:transmisiones});
        console.log(socket.id);




    });

    socket.on("disconnect",function(){


        if(sockets[socket.id])
        {


            if(sockets[socket.id].deviceLabel)
            {
                var indexOf=transmisiones.findIndex(function(el){

                    return el.deviceLabel==sockets[socket.id].deviceLabel;

                });

                console.log(indexOf);

                if(indexOf>-1)
                {
                 transmisiones.splice(indexOf,1);
                }

                io.sockets.emit('msg', {type:0,data:transmisiones});
            }



            delete sockets[socket.id];
        }







    });

    socket.on("msg", function (msg) {

        console.log(msg);

       switch (msg.type)
       {
           case 0: //actualizar transmisiones


               var socketData = {socket:socket,deviceLabel:msg.data};
               sockets[socket.id]=socketData;


               if(!msg.remove)
               {
                   var transmision={type:0,socketId:socket.id,deviceLabel:msg.data};

                   var filter=transmisiones.filter(function(el){

                       return el.deviceLabel==transmision.deviceLabel;

                   })[0];


                   if(!filter)
                   {
                       transmisiones.push(transmision);
                   }

               }
               else
               {
                   var filter=transmisiones.findIndex(function(el){

                       return el.deviceLabel==msg.data;

                   });
                   console.log(filter);
                   if(filter>-1)
                   {
                    transmisiones.splice(filter,1);
                   }

               }


               socket.broadcast.emit('msg', {type:0,data:transmisiones});



               break;
           case  1://oferta

               var sock= sockets[msg.to];
               if(sock)
                   sock.socket.emit("msg",{type:1,from:socket.id,data:msg.data});

               break;
           case 2://respuesta
               var sock= sockets[msg.to];
               if(sock)
               sockets[msg.to].socket.emit("msg",{type:2,from:socket.id,data:msg.data});

               break;
           case 3://ice candidate
               var sock= sockets[msg.to];
               if(sock)
               sockets[msg.to].socket.emit("msg",{type:3,from:socket.id,data:msg.data});

               break;

       }

        //socket.broadcast.to('game').emit("msg",msg);








    });




}
function filterArray(key,value,array) {

    var result=  array.filter(function (element) {

        return   element[key]==value;

    });

    return result;
}







