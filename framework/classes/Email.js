/**
 * Created by Gabriel on 26/12/2016.
 */

var mailer = require("nodemailer");
    var fs =require('fs');
var pug =require('pug');
module.exports= function(html,data,replyTo,to,from,subject,emailConfig,callback){
    


        var transporter = mailer.createTransport(emailConfig);



    var data= pug.renderFile(html,data);


    console.log(data);


    var mailOptions = {
        from: from, // sender address
        to: to ,// list of receivers
        replyTo:replyTo,
        subject: subject, // Subject line
        html: data// html body
    }


    console.log(mailOptions);






    transporter.sendMail(mailOptions,function(err,info){
        if(err)
        {
            throw err;

        }
        else
        {
            console.log(info);
            if(callback)
            {
                callback(true);
            }
        }

    });





    
}