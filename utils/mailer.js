/**
 * Created by Gabriel on 03/11/2016.
 */

var mailer = require("nodemailer");
module.exports=
{

    sendMail:function(html,to,from,subject,callback)
    {


            var transporter = mailer.createTransport(config.emailConfig);

            var mailOptions = {
                from: from, // sender address
                to: to ,// list of receivers
                subject: subject, // Subject line
                html: html// html body
            }








            transporter.sendMail(mailOptions,function(err,info){
                if(err)
                {
                    console.log("ERROR MAIL");
                    console.log(err);

                    if(callback)
                    {
                        callback(false);
                    }

                }
                else
                {
                    if(callback)
                    {
                        callback(true);
                    }
                }
                console.log(info);
            });



    }
}