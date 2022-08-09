import jwt from "jsonwebtoken";
import { Base64Encoder,Base64Decoder } from "base64-encoding";
import transporter from "../config/mail_config.js";
import dotenv from 'dotenv'
dotenv.config()
import ejs from 'ejs'
import base_dir from "../index.js";


const sendMail = async (user,subject)=>{
      let html;
      let link;
      const encoder = await new Base64Encoder({ url: true }).optimize();
      let encodedText = encoder.encode(new TextEncoder().encode(user._id))
      const token = await jwt.sign({
          id: user._id
          }, process.env.JWT_SECRET_KEY, { expiresIn: 5*24*60*60 });

      

      if(subject === 'Password Reset Email'){
        const bodyTitle = "you have requested to reset your password"
        const bodyDescription = "We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions."
        let PORT = process.env.PORT || 8000
        let path = `${base_dir}/views/email.ejs`
        link = `http:127.0.0.1:${PORT}/api/password-reset/${encodedText}/${token}`
        html = await ejs.renderFile(path,{title:subject,link:link,button:"Reset Password",bodyTitle:bodyTitle,bodyDescription:bodyDescription,user:user})
        

      }
      
      if(subject === 'User Verification Email'){
        console.log('inside else')
        const bodyTitle = `We're happy you signed up for Productivity. To start exploring the productivity webapp please confirm your email address.`
        const bodyDescription = "Please click on the link below to verify your email. Thank You!"
        let PORT = process.env.PORT || 8000
        let path = `${base_dir}/views/email.ejs`
        link = `http:127.0.0.1:${PORT}/api/user/${encodedText}/verify/${token}`
        html = await ejs.renderFile(path,{title:subject,link:link,button:"Verify",bodyTitle:bodyTitle,bodyDescription:bodyDescription,user:user})
      }
      let info = await transporter.sendMail({
        to: user.email, // list of receivers
        // to: "bibekdahal479@gmail.com",
        subject: subject, // Subject line
        html: html
      });


      console.log(info.messageId)
}

export default sendMail