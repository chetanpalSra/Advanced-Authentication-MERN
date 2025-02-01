const { mailTrapClient,sender } = require("./mailtrap.config.js");
const {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} = require('./emailTemplates.js');

const sendVerificationEmail = async(email,verificationToken)=>{
       const recipient = [{email}];

       try{
          const response = await mailTrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification", //for analytical purpose. 
          })        
       }catch(error){
             console.error('Error sending verification email',error.message);
             throw new Error(`Error sending verification email: ${error}`);
       }
}

async function sendWelcomeEmail(email,name){
    const recipient = [{email}];

    try{
      const response = await mailTrapClient.send({
        from: sender,
        to: recipient,
        template_uuid:"ed1b1f48-9854-490e-b0d0-c91dfbd155b7",
        template_variables: {
          "company_info_name": "Auth Company",
          "name": name
        } 
      })      
    }catch(error){
         throw new Error(`Error sending welcome email: ${error}`)
    }
    
}

async function sendPasswordResetEmail(email,resetUrl){
           const recipient = [{email}];

           try{
            const response = await mailTrapClient.send({
              from: sender,
              to: recipient,
              subject: 'Reset your Password',
              html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
              category: 'Password Reset'
            }); 
            
           }catch(error){
               console.error('Error sending password reset email',error.message);
               throw new Error('Error sending password reset email:',error)
           }
}

async function sendResetSuccessEmail(email){
       const recipient = [{email}];
       try{
            const response = await mailTrapClient.send({
              from: sender,
              to: recipient,
              subject: 'Password Reset Successful',
              html: PASSWORD_RESET_SUCCESS_TEMPLATE,
              category: 'Password Reset'
            })
       }catch(error){
               console.error('Error sending password reset success email',error.message);
               throw new Error('Error sending password reset success email:',error);
       }
}
module.exports = {sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail} 