/**
 * Created by Gabriel on 06/10/2016.
 */
var io;
var connections= new Array();
var users = [];
module.exports={

    signallingServer:function (server) {

         io = require("socket.io").listen(server);
        io.sockets.on('connection',onConnection);




        function onConnection(socket)
        {
            connections[socket.id]=socket;
            users.push({id:socket.id});

            socket.emit("myid",socket.id);

                socket.broadcast.emit("loadusers",users);


socket.on("print",function(e){

console.log(e);

});
            socket.on("msg",onMsg);
            socket.on('loadusers',loadUsers);
            socket.on("disconnect",function(){

              connections=  connections.slice(connections.indexOf(connections[socket.id]),1);

              users.splice(users.findIndex(function(e){

                return e.id==socket.id;
              }),1);




              socket.broadcast.emit("loadusers",users);



            });



            function onMsg(data)
            {
                console.log(data);
                var conn =  connections[data.to];
                if(conn)
                {
                switch (data.type)
                {
                    case 1:

                      conn.emit("msg",{type:1,from:socket.id,data:data.data});

                        break;
                    case 2:



                        conn.emit("msg",{type:2,from:socket.id,data:data.data});
                        break;
					case 3:


					    conn.emit("msg",{type:3,from:socket.id,data:data.data});
					   
					   break;
					
                }


            }
            }
            function loadUsers()
            {

             connections[socket.id].emit("loadusers",users);



            }




        }








    }

}