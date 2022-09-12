import jwt from "jsonwebtoken";
import { Base64Encoder,Base64Decoder } from "base64-encoding";
import transporter from "../config/mail_config.js";
import dotenv from 'dotenv'
dotenv.config()
import ejs from 'ejs'
import base_dir from "../index.js";


const sendMail = async (user,subject,extra=null)=>{
      let html;
      let link;
      const path = `${base_dir}/views/email.ejs`
      
      const encoder = await new Base64Encoder({ url: true }).optimize();
      let encodedText = encoder.encode(new TextEncoder().encode(user._id))
      const token = await jwt.sign({
          id: user._id
          }, process.env.JWT_SECRET_KEY, { expiresIn: 5*24*60*60 });

      

      if(subject === 'Password Reset Email'){
        const bodyTitle = "you have requested to reset your password"
        const bodyDescription = "We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions."
        let PORT = process.env.PORT || 8000
        // let path = `${base_dir}/views/email.ejs`
        link = `http:127.0.0.1:${PORT}/api/password-reset/${encodedText}/${token}`
        html = await ejs.renderFile(path,{title:subject,link:link,button:"Reset Password",bodyTitle:bodyTitle,bodyDescription:bodyDescription,user:user})
        

      }else if(subject === 'User Verification Email'){
        console.log('inside else')
        const bodyTitle = `We're too happy you signed up for Productivity. To start exploring the productivity webapp please confirm your email address.`
        const bodyDescription = "Please click on the link below to verify your email. Thank You!"
        let PORT = process.env.PORT || 8000
        console.log('sending mail')
        // link = `http:127.0.0.1:${PORT}/api/user/${encodedText}/verify/${token}`
        link = `http://127.0.0.1:3000/verify-account/${encodedText}/${token}`;
        html = await ejs.renderFile(path,{title:subject,link:link,button:"Verify",bodyTitle:bodyTitle,bodyDescription:bodyDescription,user:user})
        

      }else if(subject === "Group Invitation Email"){
        console.log('inside group invitation')
        console.log(extra.group.name)
        const bodyTitle = "You are invited to join a group"
        const bodyDescription = `Please click on the link below so that you can be a member of ${extra.group.name}`
        const PORT = process.env.PORT || 8000
        const encodedUserId = encoder.encode(new TextEncoder().encode(user._id))
        const encodedGroupName = encoder.encode(new TextEncoder().encode(extra.group.name)) 
        const token = await jwt.sign(
          {
            id: user._id
          }, process.env.JWT_SECRET_KEY, { expiresIn: 5*24*60*60 }
          );
        // link = `http:127.0.0.1:${PORT}/api/group/${encodedGroupName}/join/${token}`
        link = `http://127.0.0.1:3000/accept-group-invite/${encodedGroupName}/${token}`;
        html = await ejs.renderFile(path,{title:subject,link:link,button:"Join",bodyTitle:bodyTitle,bodyDescription:bodyDescription,user:user})
      }


      console.log('sending mail to ',user);
     try{
      let info = await transporter.sendMail({
        to: user.email, // list of receivers
        // to: "bibekdahal479@gmail.com",
        subject: subject, // Subject line
        html: html
      });
      console.log(info.messageId)
     }catch(err){
      console.log('error ',err);
     }

}

export default sendMail