/**
 * Created by Gabriel on 15/09/2016.
 */

module.exports=
{
    observableArray:function() {



        var event = new CustomEvent('arrayChanged');

// Disparar event.




      var oArray={
            array :[],
            push: function (data) {
                    var a = [];
                    a.push(data)

                },
            pop:function()
            {
                return this.array.pop();

            }


        };


         oArray.dispatchEvent(event);





      return  oArray;

    }
}