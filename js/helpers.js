/**
 * Created by Gabriel on 24/09/2016.
 */


$(document).on("click",".close-modal",function(e){

    var target =$(e.target);
    target= target.closest(".w3-modal");

    var type  = target.attr("data-type");



      target.fadeOut('fast',function(){

        Cookies.remove(type+'msgmodal', {path: '/'});
    });



});


function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};

    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });

    return json;
}

function sendData(url,method,data,success,error)
{

    $.ajax({
        url:url,
        method:method,
        dataType:"json",
        data:data,
        success:function()
        {

            alert("OK");
        }
        ,error:function(){
            alert("error");
        }


    });

}