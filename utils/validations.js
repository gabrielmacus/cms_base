/**
 * Created by Gabriel on 02/11/2016.
 */

module.exports=
{/*

 console.log(isValidString(">[CfS8s=jmjpF:N*",{numbers:true,letters:true,allowedSpecialChars:">[=:*>",allowedSpecialAdjacent:true,maxLength:20,lastSpecialAllowed:true,firstSpecialAllowed:true}));

 console.log(isValidString("CfS-8s*=jmjpF:N*",{numbers:true,letters:true,allowedSpecialChars:">[=:*>",allowedSpecialAdjacent:false,lastSpecialAllowed:true,maxLength:210}));



 */
    /**
     *
     * @param string - Cadena a validar
     * @param config - Configuracion de validacion.
     * {numbers:true, permite numeros
     * letters:true, permite letras
     * allowedSpecialChars:">[=:*>", caracteres especiales permitidos , "ALL" para permitir todos
     * allowedSpecialAdjacent:false, caracteres especiales continuados
     * lastSpecialAllowed:true,
     * maxLength:210
     * minLength:3,
     * firstSpecialAllowed:false,
     * lastSpecialAllowed:false
     *
     *
     * }
     *
     * @returns {*}
     */
     isValidString:function(string,config)
     {    var report={};

                var length= string.length;

             if(config.maxLength)
             {


                 if(length>config.maxLength)
                 {

                     report.charOffset= length-config.maxLength;
                     // return false;
                 }

             }
             if(config.minLength)
             {
                 if(length<config.minLength)
                 {

                     report.charOffset= length-config.minLength;
                     // return false;
                 }
             }

             for(var i=0;i<length;i++)
             {

                 if(i>0)
                 {
                     var prevChar=string.charAt(i-1);
                 }

                 var char = string.charAt(i);
                 var isNumber =char.match(/[0-9]/i);
                 var isLetter = char.match(/[a-zA-Z]/i);



                 if(isNumber&& config.numbers==false)
                 {
                     report.hasNumbers=true;
                     // return false;
                 }
                 if(isLetter&& config.letters==false)
                 {
                     report.hasLetters=true;
                 }

                 if(config.allowedSpecialChars)
                 {

                     if(config.allowedSpecialChars.indexOf(char)==-1&&!isLetter&&!isNumber)
                     {
                         report.hasDisallowedChars=true;
                     }
                     else
                     {



                         if(!config.allowedSpecialAdjacent && config.allowedSpecialChars.indexOf(char)!=-1 && config.allowedSpecialChars.indexOf(prevChar)!=-1 )
                         {
                             report.hasAdjacentChars=true;
                         }
                     }



                 }
                 else
                 {
                     if(!char.match(/[0-9a-zA-Z]/i))
                     {
                         report.hasDisallowedChars=true;
                     }


                 }


             }


             if(!config.firstSpecialAllowed)
             {

                 var firstChar =string.charAt(0);
                 if(!firstChar.match(/[0-9a-zA-Z]/i))
                 {
                     report.hasSpecialsAtFirst=true;
                 }
             }
             if(!config.lastSpecialAllowed)
             {

                 var lastChar =string.charAt(length-1);
                 if(!lastChar.match(/[0-9a-zA-Z]/i))
                 {
                     report.hasSpecialsAtLast=true;
                 }
             }

             if(Object.keys(report).length>0)
             {
                 return report;
             }
             else
             {
                 return true;
             }





     },
    isValidEmail:function(string){

        if(string.trim() !=""){
            return string.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
            );
        }
        else
        {
            return false;
        }
    }

}