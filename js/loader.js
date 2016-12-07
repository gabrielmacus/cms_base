
function showLoader()
{
    document.querySelector("#loadingModal").style.display="block";
}
function hideLoader()
{
    document.querySelector("#loadingModal").style.display="none";
}


$.ajaxSetup({
    beforeSend: function() {
        showLoader();
    },
    complete: function() {
        hideLoader();
    }
});
$(document).ajaxError(function(){
    hideLoader();
});