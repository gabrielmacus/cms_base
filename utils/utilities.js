
module.exports=
{
    sum: function (array,prop) {

        var sum=0;
        array.forEach( function (item,index) {

            sum+=item[prop];

        });
        return sum;
    }
}