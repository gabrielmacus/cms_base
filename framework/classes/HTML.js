/**
 * Created by Luis Garcia on 20/12/2016.
 */
var pug =  require('pug');
var fs = require('fs');

module.exports=class HTML
{
    constructor(language,page,data,isUser)
    {
        if(!language)
        {
            language="default";
        }
        var folder="user";
        if(!isUser)
        {
            folder="guest";

        }

        var html=pug.renderFile('html/'+language+'/'+folder+'/'+page+".pug",data);

        return html;

    }
}