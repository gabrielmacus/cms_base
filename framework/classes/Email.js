/**
 * Created by Gabriel on 26/12/2016.
 */

var mailer = require("nodemailer");
    var fs =require('fs');
module.exports= function(html,data,to,from,subject,emailConfig,callback){
    


        var transporter = mailer.createTransport(emailConfig);

      fs.readFile(html,function (html) {



          var mailOptions = {
              from: from, // sender address
              to: to ,// list of receivers
              subject: subject, // Subject line
              html: html// html body
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

      });






    
}