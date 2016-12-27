/**
 * Created by Luis Garcia on 20/12/2016.
 */

'use strict';


var fs = require('fs');

module.exports=class Config
{
    constructor(language)
    {
        if(!language|| !isNaN(language+1))
        {
            language="default";
        }
        else
        {
         if(mainConfig.languages.indexOf(language)>-1)
         {
             throw new Error("Language not defined");
         }
        }
        return JSON.parse(fs.readFileSync('config/'+language+'.json','UTF-8'));
    }



}