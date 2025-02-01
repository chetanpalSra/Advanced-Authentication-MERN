require('dotenv').config();
const User = require('../modals/user');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const {generateVerificationToken} = require('../utility/gvt');
const {generateTokenAndSetCookie} = require('../utility/gtasc');
const {sendVerificationEmail,sendWelcomeEmail,sendPasswordResetEmail,sendResetSuccessEmail} = require('../mailtrap/emails')

async function handleSignup(req,res){
       const {name,email,password} = req.body;
      try{
       if(!email||!password||!name){
              throw new Error("All fields are required");
       }
       const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
              return res.status(400).json({success: false,message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);

            //This function returns promise,so we have to await-->

       const hashedPassword = await bcrypt.hash(password,salt);

       const verificationToken = generateVerificationToken();


       const user = await User.create({name,email,password: hashedPassword,
              verificationToken,
              verificationTokenExpiresAt: Date.now() + 15*60*1000
       });

       // jwt token
       generateTokenAndSetCookie(res,user._id);
       await sendVerificationEmail(user.email,verificationToken);

       return res.status(201).json({success: true,message: "User created Successfully",
       user:{
              ...user._doc,
              password: undefined
       }
       });

      }catch(error){
       return res.status(500).json({success: false,message: error.message});
      }
}

async function handleEmailVerify(req,res){
     const {code} = req.body;
     try{
       const user = await User.findOne({
              verificationToken: code,
              verificationTokenExpiresAt: {$gt: Date.now()}
       })

       if(!user){
              return res.status(400).json({success: false,message: "Invalid or expired verification code"});
       }

       user.isVerified = true;
       user.verificationToken = undefined;
       user.verificationTokenExpiresAt = undefined;

       await user.save();

       await sendWelcomeEmail(user.email,user.name);

       return res.status(200).json({success:true,message: 'Email Verified Successfully',
       user: {
              ...user._doc, 
              password: undefined,
       }
      })
     }catch(error){
       console.log('Error Verifying Email:',error.message);
       
       return res.status(500).json({success: false,message: "Server Error"});
     }
     
}

async function handleLogin(req,res){
      const {email,password} = req.body;

      try{
        const user = await User.findOne({email});
        if(!user){
              return res.status(400).json({success: false,message: "Invalid credentials"});
        }
 
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false,message: "Invalid credentials"});
        }

        generateTokenAndSetCookie(res,user._id);

        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
              success: true,
              message: "Logged in Successfully",
              user:{
                     ...user._doc,
                     password: undefined, // means password is not shown now.
              }
        });
      }catch(error){
            console.log('Error in Login function',error);
            return res.status(500).json({success: false,message: error.message})
      }
}

async function handleLogout(req,res){
       res.clearCookie("token");
       return res.status(200).json({success: true,message: "Logged out successfully."})
}

async function handleForgotPassword(req,res){    
       const {email} = req.body;
       try{
            const user = await User.findOne({email});
            if(!user){
              return res.status(404).json({success: false,message: "User not found"});
            }
            
            //Generate reset Token.
            const resetToken = crypto.randomBytes(20).toString("hex");
            const resetTokenExpiresAt = Date.now() + 1* 60 * 60 * 1000; //1 hour

            user.resetPasswordToken = resetToken;
            user.resetPasswordExpiresAt = resetTokenExpiresAt;
            
            await user.save();

            // send Email.

            await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
            
            return res.status(200).json({success: true,message: 'Password reset link sent your email'});


       }catch(error){
          console.log('Error in forgotPassword',error);
          return res.status(500).json({success: false,message: message.error});
       }
}

async function handleResetPassword(req,res){
       try{
              const {token} = req.params;
              const {password} = req.body;
   
              const user = await User.findOne({
                     resetPasswordToken: token,
                     resetPasswordExpiresAt: {$gt: Date.now()},
              })
              if(!user){
                     return res.status(400).json({success: false, message: "Invalid or expired reset token"});
              }

              //update Password.
              const salt = await bcrypt.genSalt(10);
  
              const hashedPassword = await bcrypt.hash(password,salt);

              user.password = hashedPassword;
              user.resetPasswordToken = undefined;
              user.resetPasswordExpiresAt = undefined; 

              await user.save();

              await sendResetSuccessEmail(user.email);

              return res.status(200).json({success: true, message: 'Password reset successful'});
   
   
          }catch(error){
              console.log('Error in resetPassword',error);
              return res.status(500).json({success: false,message: message.error});
          }
}

async function checkAuth(req,res){
    try {
       const user = await User.findById(req.userId).select("-password");
       console.log(user);
       
       if(!user){
              return res.status(404).json({success: false,message: 'User not found'});
       }

       return res.status(200).json({success: true,
       user}); 
    } catch (error) {
       console.error('Error in checkAuth:', error.message);
       return res.status(500).json({ success: false, message: 'Server Error' })
    }
}
module.exports ={handleLogin,handleLogout,handleSignup,handleEmailVerify,handleForgotPassword,handleResetPassword,checkAuth}; 