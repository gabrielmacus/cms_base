/**
 * Created by Gabriel on 26/12/2016.
 */
var Email = require('../classes/Email');

module.exports=function(server){
    
    
    server.post('/send-email',function (req,res) {
        
        var emailData = req.body;


        
        

        new Email('framework/views/emails/A.pug',{nombre:"Roberto"},emailData.to,emailData.from,emailData.subject,config.emailConfig,function (data) {

            res.send(true);
       });
        
        
        
    });
    
    
    
}