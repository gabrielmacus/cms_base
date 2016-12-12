

function readFile(files,type,callback)
{

    var i=0

    var length=files.length;

    var reader = new FileReader();

    var progressBar = $(".progressBar");

    var label= $(".label");

    var totalLoaded = 0;
    var totalSize=0;
    $.each(files,function(index,item){

        totalSize+=item.size;

    });


    var currentProgress=0;
    process();
    function process()
    {





        // Closure to capture the file information.

        var lastProgress=0;

        reader.onprogress = function (e) {

            var loaded = e.loaded;

            var total = e.total;

            totalLoaded+=(loaded-lastProgress);


            lastProgress=loaded;


            currentProgress=(totalLoaded*100)/totalSize;




            progressBar.animate({width:currentProgress+"%"},0,function(){

                label.html(Math.round(currentProgress));
            });



        }
        reader.onload = (function (file) {

            //https://www.html5rocks.com/en/tutorials/file/dndfiles/

            return function (e) {

                var split =file.name.split(".");
                var ext;
                if(split.length) {
                     ext = split[split.length - 1];
                }


                if(callback)
                {
                    callback(e.target.result,ext);
                }


                if (i < length-1) {
                    i++;

                    process();
                }
            }


        })(files[i]);


        switch(type)
        {
            case 1:
                reader.readAsDataURL(files[i]);
                break;
            case 2:
                reader.readAsArrayBuffer(files[i]);
                break;
            case 3:

                reader.readAsBinaryString(files[i]);
                break;
            case 4:
                reader.readAsText(files[i]);
                break;

        }


    }










}

function handleFileSelect(type,callback) {

    var files = document.querySelector(".file-selector").files; // FileList object

    readFile(files,type,callback);



}
