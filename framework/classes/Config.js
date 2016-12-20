/**
 * Created by Luis Garcia on 20/12/2016.
 */

'use strict';


var fs = require('fs');

module.exports=class Config
{
    constructor(language)
    {
        if(!language)
        {
            language="default";
        }
        return JSON.parse(fs.readFileSync('config/'+language+'.json','UTF-8'));
    }



}