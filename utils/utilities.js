var fs = require("fs");
module.exports=
{
    sum: function (array,prop) {

        var sum=0;
        array.forEach( function (item,index) {

            sum+=item[prop];

        });
        return sum;
    },
    mkDirRecursive:function (path)
    {
        
        path = path.split("\\");

        var joinedPaths="";
        for(var i=0;i<path.length;i++)
        {
            joinedPaths+=path[i]+"/";
     
            if (!fs.existsSync(joinedPaths)){
                fs.mkdirSync(joinedPaths);

            }
        }


    },
    getFileOcurrencies:function (path,name,callback) {



        return fs.readdirSync(path).filter(function (el) {
            return el==name;
        });
    }
}