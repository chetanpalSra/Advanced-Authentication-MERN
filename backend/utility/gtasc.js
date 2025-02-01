require('dotenv').config();

const jwt = require("jsonwebtoken")

const generateTokenAndSetCookie = (res,userId)=>{
      const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '7d',
      })

      res.cookie("token",token,{
         httpOnly: true,// When the httpOnly attribute is set on a cookie, it ensures that the cookie cannot be accessed or manipulated using client-side JavaScript.Mitigates Cross-Site Scripting (XSS) Attacks:
         secure: process.env.NODE_ENV === "production",// Only secure in production.
         sameSite: "strict", //Use sameSite to prevent CSRF attacks 
         maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return token;
}

module.exports = {generateTokenAndSetCookie};