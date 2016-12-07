/**
 * Created by Gabriel on 23/08/2016.
 */

var fs = require('fs');

module.exports=
{
    log:function(data)
    {

        try
        {

            var ahora =new Date();
            data.time=ahora.toLocaleDateString()+" "+ahora.toLocaleTimeString();
            var d =JSON.stringify(data);
            JSON.parse(d);

            console.log(d);

            fs.appendFile(__dirname+"/../logs/trac.log","\r\n"+d+",");

        }
        catch (e)
        {     var ahora =new Date();

            data = ahora.toLocaleDateString()+" "+ahora.toLocaleTimeString()+" : "+data;
            fs.appendFile(__dirname+"/../logs/trac.log","\r\n"+data+",");



        }



    }

}