
function Select(selector,config) {

    var select=$(selector);
    var options =select.find("option");
    var html = "<div class='custom-select'>";


    html+="<span>A</span>";


     html+="<ul >";
    $.each(options,function (index,item) {
        var item=$(item);
        html+="<li>"
        html+=item.html();
        html+="</li>";

    })
    html+="</ul>";
    html+="</div>";
    select.replaceWith($.parseHTML(html));
}