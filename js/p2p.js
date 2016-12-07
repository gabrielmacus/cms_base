

function P2P(socket,$scope) {


    this.socket=socket;
    this.$scope=$scope;
     connection= new RTCPeerConnection(configuration);
    connection.onicecandidate=function(data)
    {

        socket.emit("msg",{type:3,to:connectedId,data:data.candidate});
    };


    socket.on("msg",function(data){
        console.log(data);

        switch (data.type)
        {
            case 1:


                connection.setRemoteDescription(data.data).then(function() {

                    connectedId=data.from;
                    connection.createAnswer().then(function(answer){


                        connection.setLocalDescription(answer).then(function(){


                            socket.emit("msg",{type:2,to:data.from,data:answer});


                        }).catch(function(err){
                            console.log("local description error");

                            console.log(err);
                        });


                    }).catch(function(err){

                        alert("create answer error");
                        console.log(err);

                    });


                }).catch(function(err){

                    alert("remote description error");
                    console.log(err);

                });


                break;

            case 2:




                connection.setRemoteDescription(data.data).then(function() {

                    connectedId=data.from;



                }).catch(function(err){

                    alert("remote description error");
                    console.log(err);

                });

                break;
            case 3:
                if(data.data)
                {
                    connection.addIceCandidate(new RTCIceCandidate(data.data));
                }

                break;

        }

    });





    var configuration = {
        "iceServers": [{url: 'stun:stun01.sipphone.com'},
            {url: 'stun:stun.ekiga.net'},
            {url: 'stun:stun.fwdnet.net'},
            {url: 'stun:stun.ideasip.com'},
            {url: 'stun:stun.iptel.org'},
            {url: 'stun:stun.rixtelecom.se'},
            {url: 'stun:stun.schlund.de'},
            {url: 'stun:stun.l.google.com:19302'},
            {url: 'stun:stun1.l.google.com:19302'},
            {url: 'stun:stun2.l.google.com:19302'},
            {url: 'stun:stun3.l.google.com:19302'},
            {url: 'stun:stun4.l.google.com:19302'},
            {url: 'stun:stunserver.org'},
            {url: 'stun:stun.softjoys.com'},
            {url: 'stun:stun.voiparound.com'},
            {url: 'stun:stun.voipbuster.com'},
            {url: 'stun:stun.voipstunt.com'},
            {url: 'stun:stun.voxgratia.org'},
            {url: 'stun:stun.xten.com'},
            {
                url: 'turn:numb.viagenie.ca',
                credential: 'muazkh',
                username: 'webrtc@live.com'
            },
            {
                url: 'turn:192.158.29.39:3478?transport=udp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808'
            },
            {
                url: 'turn:192.158.29.39:3478?transport=tcp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username: '28224511:1379330808'
            }] //[{ "url": "stun:stun2.1.google.com:19302" },{ "url": "stun.l.google.com:19302" },{ "url": "stun2.l.google.com:19302" },{ "url": "stun.voipstunt.com" },{ "url": "stun.ideasip.com" },{ "url": "stun01.sipphone.com" },{ "url": "stun.xten.com" },{ "url": "stun.softjoys.com" },{ "url": "stun.l.google.com:19305" },{ "url": "stun1.l.google.com:19305" },{ "url": "stun.rixtelecom.se" },{ "url": "stun.schlund.de" }]
    };
    var connection;
    var socket;
    var $scope;
    var connectedId;


      this.onAddStream=function(func) {

        connection.onaddstream =func;
    }

    this.addStream=function(stream)
    {
        connection.addStream(stream);
    }

    this.callTo=function(id)
    {
        alert("Llamando a "+id);

        connectedId=id;
        connection.createOffer().then(function(offer) {
            connection.setLocalDescription(offer).then(
                function()
                {
                    socket.emit("msg",{type:1,to:id,data:offer});
                }
            ).catch(function(err){

                alert("local description error");
                console.log(err);
            });




        }).catch(function(err) {
            alert("Offer error");
            console.log(err);
        });
    }


}

