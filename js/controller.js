var app = angular.module('purpleApp', []);




app.factory('socket', function ($rootScope) {
    var socket = io.connect('wss://192.168.1.103');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

app.controller('purpleCtrl',controller);

function controller($scope,socket) {

    $scope.users=[];

    try {


        var p2p = new P2P(socket,$scope);


        loadUsers();

        p2p.onAddStream(function(e){

            document.querySelector("audio").src= URL.createObjectURL(e.stream);
           console.log(e);

        });


    


        navigator.mediaDevices.getUserMedia({audio:true,video:true})
        .then(function(stream) {


        p2p.addStream(stream);

        var localVideo= document.querySelector("#localVideo");

        localVideo.srcObject=stream;

        p2p.onAddStream(function(e){

            var remoteVideo=document.querySelector("#remoteVideo");
            remoteVideo.srcObject=e.stream;


        });

        }).catch(function (e) {
           console.log(e);
           alert("media error");
                 socket.emit("print",e);
       });


    }catch (e)
    {
      socket.emit("print",e);
    }

    
    socket.on("myid",function (data) {
       $scope.myUser=data;
        removeMyUser();
    });





    function loadUsers()
    {
        socket.emit("loadusers");
    }

    socket.on("loadusers",function(users){
        $scope.users= users;
        removeMyUser();
    });

   function removeMyUser()
   {

     $scope.users.splice($scope.users.findIndex(function(e){

        return e.id==$scope.myUser;
      }),1);
  

   }
     

    $scope.connectTo=function(id)
    {



        p2p.callTo(id);




    }

    $scope.playAudio=function(){
        playAudio();
    };
    $scope.pauseAudio=pauseAudio;

    $scope.loadFiles= function()
    {
        handleFileSelect(2,function(data){

            

            addAudioFile(data,function (buffer) {

                createSource(buffer,function () {
                    p2p.addStream(getAudioStream());
                })

            
            });



            /*https://servicelab.org/2013/07/24/streaming-audio-between-browsers-with-webrtc-and-webaudio/
             http://stackoverflow.com/questions/26431333/send-mediastream-object-with-web-audio-effects-over-peerconnection



             var audio = document.createElement("audio");
             //var tracks=document.querySelector(".tracks");
             audio.src = data;

             console.log(audio.src);
             audio.play();

             tracks.appendChild(audio);*/

        });
    }





}
