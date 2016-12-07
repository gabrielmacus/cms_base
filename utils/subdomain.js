/**
 * Created by Gabriel on 27/09/2016.
 */

module.exports={

    handleSubdomain:function(h) {
            var parts = h.split(".");

            if(parts.length>1) {
                return parts[0];
            }
        else
            {
                return false;
            }
        }


}