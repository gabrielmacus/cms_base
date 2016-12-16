/**
 * Created by Gabriel on 24/09/2016.
 */
/*$(document).on("mouseover","figure",function(e){
    var target =$(e.target).closest("figure").find("figcaption");
    target.stop();
    target.animate({"opacity":"toggle"},300);

});

$(document).on("mouseout", "figure", function (e) {
    var target = $(e.target).closest("figure").find("figcaption");
    target.stop();
    target.animate({"opacity": "toggle"}, 300);

});*/
$(document).on("click",".open-submenu",function(e){

    var target = $(e.target).closest(".open-submenu");
    var submenu =target.attr("data-submenu");

   var menu=   $(".submenu."+submenu);
    menu.stop();
    menu.slideToggle();

});

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


/**
 * elemento draggable
 */

/*********/

var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;
    if (selected !== null) {
        selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}

// Bind the functions...
$(document).on("mousedown",'.draggable-element', function () {
    _drag_init(this);
    return false;
});

document.onmousemove = _move_elem;
document.onmouseup = _destroy;


/*******/