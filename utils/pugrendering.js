/**
 * Created by Gabriel on 22/09/2016.
 */
var pug= require('pug');

var fs = require('fs');

module.exports=
{
    renderFile: function(filename,json,res)
    {
        var html=pug.renderFile(process.cwd() +"/views/"+filename,json,null);

        if(res)
        {
            res.send(html);
        }
        else
        {
            return html;
        }



    }


}