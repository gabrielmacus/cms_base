
module.exports=
{
	 filterById:function(array,id,idkey)
        {

            if(!idkey)
            {
                idkey="id";
            }


         return   array.filter(function (el) {

             if(el[idkey]==id)
             {
                 return el;
             }

            });
        },
    filterMultiple:function(array,value1,value2,key1,key2)
    {



        return   array.filter(function (el) {

            if(el[key1]==value1 && el[key2]==value2)
            {
                return el;
            }

        });
    }
}