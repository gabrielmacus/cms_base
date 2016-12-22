/**
 * Created by Luis Garcia on 20/12/2016.
 */
'use strict';

var pug =  require('pug');
var fs = require('fs');


var mergeJSON = require("merge-json") ;

module.exports=class HTML
{
    constructor(language,page,data,res)
    {
        if(!language)
        {
            language="default";
        }
        var folder="user";

        
        var isUser = res.locals.user;
        
        if(!isUser)
        {
            folder="guest";

        }

        var text = JSON.parse(fs.readFileSync('html/'+language+'/'+folder+'/'+page+".json").toString());


        var global = JSON.parse(fs.readFileSync('html/'+language+'/global.json').toString());


text =mergeJSON.merge(text,global);





        data.body=text;


        var html=pug.renderFile('html/'+language+'/'+folder+'/'+page+".pug",data);


        return {code:html}
    }
}