/**
 * Created by Gabriel on 12/10/2016.
 */


var context = new AudioContext();

var source;
var remote;
var pausedAt;
var startedAt;
var buffer;
var timer;
var seconds=0;
var volumeController;

function createSource(buffer, callback) {

    // create an audio source and connect it to the file buffer
    source = context.createBufferSource();

    source.buffer = buffer;
    // connect the audio stream to the audio hardware
    source.connect(context.destination);


    /*
     volumeController=context.createGain();
    source.connect(volumeController);
    volumeController.connect(context.destination);

    console.log(source);*/

    if(callback)
    {
        callback();
    }


}
function addAudioFile(data,callback) {

    context.decodeAudioData(data, function(buffer) {


        this.buffer=buffer;

        if(callback)
        {
            callback(buffer);
        }
        //  createSource(buffer,callback);

    });
}
function adjustVolume(value)
{
    volumeController=context.createGain();
    volumeController.gain.value=value;
    source.connect(volumeController);
    volumeController.connect(context.destination);

    console.log(volumeController);
}
function pauseAudio(callback) {


    if(!pausedAt)
    {
        source.stop();
        pausedAt = Date.now();
        clearInterval(timer);
        if(callback)
        {
            callback();
        }

    }
}
function playAudio(callback) {





    createSource(buffer, function () {




            if (pausedAt && startedAt) {
                // pausedAt =Date.now()-startedAt;
                // var time = pausedAt-(startedAt+(seconds*1000));
                //time=time/1000;


                source.start(0, seconds);


            }
            else {
                source.start(0);
                startedAt = Date.now();

            }
            timer = window.setInterval(function () {

                seconds++;
            }, 1000);
            pausedAt = null;
            if(callback)
            {
                callback();
            }
        });





}
function getAudioStream() {


     remote = context.createMediaStreamDestination();
    // connect the remote destination to the source

    source.start(0);
    source.connect(remote);


    return remote.stream;



}