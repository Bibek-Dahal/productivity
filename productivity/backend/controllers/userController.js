import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { Base64Encoder,Base64Decoder } from "base64-encoding";
import transporter from "../utils/sendMail.js";
import cloudinary from "../config/cloudinary.js";



class UserController{
    //function for registering new user
    static async register(req,res){
        
        
        // console.log(result)
        let err = {
            errors:{},
            status:"failed",
            message:"unable to register"
        };
        
        try{
            if(req.file){
                let cloud_res = await cloudinary.v2.uploader.upload(req.file.path,{folder:"node"})
                req.body.avatar = cloud_res.secure_url
            }
            
            let user = User(req.body)
            await user.save()
        
            const data = {
                message:"user created successfully",
                success:true,
                
            }
            res.status(201).send(data)
            
  
        }catch(error){
            // console.log(error)
            console.log('hello i am called')
            if (error.name === "ValidationError") {
                
                Object.keys(error.errors).forEach((key) => {
                  err.errors[key] = error.errors[key].message;
                });
          
                res.status(400).send(err);
            }else{
                console.log(error)
                return res.status(500).send({message:"Something went wrong"});
            }
        } 
    }

    /*
        log user 
    */

    static async login(req,res){
        let err = {errors:{}}
        const {email,password} = req.body
        
        try{
            console.log('i am inside try')
            let user = await User.findOne({email:email})
            //check if user doesnot exists
            console.log(!user)
            if(!user){
                res.status(401).send({
                    message:"the provided credential does not match our record",
                    status:"failed"
                })
            }else{
                //check for password if user exists
                let result = await User.checkUser(password,user.password)
                if(result){
                    //log the user
                    const token = await jwt.sign({
                        id: user._id
                        }, process.env.JWT_SECRET_KEY, { expiresIn: 15*24*60*60 });
                    
                        res.status(200).send({
                        message:"login successful",
                        token:token,
                        success:true
                    })
                }else{
                    //send err if password didnt match
                    res.status(401).send({
                        message:"the provided credential does not match our record",
                        status:"failed"
                    })
                }
            }
            
        }catch(error){
            console.log(error)
            err.errors.message = "Something went wrong"
            res.status(500).send(err)
        }
        
    
    }

    /*
        password change
    */
    static async passwordChange(req,res){
        const {old_password,new_password,confirm_password} = req.body
        let err = {errors:{}}
        // if(!old_password){
        //     err.errors.old_password = "old password field is required"
        // }
        // if(!new_password){
        //     err.errors.new_password = "new password field is required"
        // }
        // if(!confirm_password){
        //     err.errors.confirm_password = "confirm password field is required"
        // }
        // if(!old_password || !new_password || !confirm_password){
        //   res.status(400).send({
        //     message:'all fields are required',
        //     success:false
        //   })
        
        // if(Object.keys(err.errors).length !== 0){
        //     console.log('inside')
        //     res.status(400).send(err)
        // }
        
        try{
            let user = await User.findById(req.user_id)
            let result = await User.checkUser(old_password,user.password)
            if(result){
        
                //change the password
                let user = await User.findById(req.user_id)
                user.password = new_password
                await user.save()
                res.status(200).send({
                    message:"password changed successfull",
                    success:true
                })
        
            }else{
                
                // err.errors.old_password = "old password does not match current password"
                // err.message = "password change failed"
                res.status(400).send({
                    errors:{
                        old_password:"old password does not match current password"
                    },
                    message:"password change failed"

                })
                
            }

        }catch(error){
            if (error.name === "ValidationError") {
            
                Object.keys(error.errors).forEach((key) => {
                    err.errors[key] = error.errors[key].message;
                });
            
                res.status(400).send(err);
            }else{
                console.log(error)
                return res.status(500).send({message:"Something went wrong"});
            }
        }
        
    }

    /*
        send password reset email
    */
    static async passwordResetEmail(req,res){
        const {email} = req.body
        console.log(email)
        let err = {errors:{}}

        try{
            const encoder = await new Base64Encoder({ url: true }).optimize();
            let user = await User.findOne({email:email})
            console.log(user)
            if(user !== null){

                //sent mail
                res.status(200).send({
                    message:"password reset email sent",
                    success:true
                })

                let encodedText = encoder.encode(new TextEncoder().encode(user._id))
                const token = await jwt.sign({
                    id: user._id
                    }, process.env.JWT_SECRET_KEY, { expiresIn: 5*24*60*60 });

                console.log(transporter)
                let info = await transporter.sendMail({
                from: 'ecommerce11780@gmail.com', // sender address
                to: "bibekdahal479@gmail.com", // list of receivers
                subject: "Password Reset Email", // Subject line
                // text: `click on the link 127.0.0.1:8000/${encodedText}/${token} to reset your password`, // plain text body
                html: `<p>click on the link 127.0.0.1:8000/api/password-reset/${encodedText}/${token} to reset your password</p>`, // html body
                });


                console.log(info.messageId)
                
            }else{
                res.status(200).send({
                    message:"mail sent",
                    status:"success"
                })
            }
        }catch(error){
            console.log(error)
            return res.status(500).send({message:"Something went wrong"});
        }
        
        
    }
    

    /*
    Reset user password
    */
   static async passwordReset(req,res){
    const {userId,token} = req.params
    const {new_password,repeat_password} = req.body
    let err = {errors:{}}


    try{
        let result;
        let id;
        try{
            result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            // const decoder = await new Base64Decoder().optimize();
            id = new TextDecoder().decode(new Base64Decoder().decode(userId))
        }catch(error){
            return res.status(400).send({message:"Token Expired"});
        }

        const user = await User.findById(id)

        //checks if user is present and token is valid
        if(result && user){
            //check if token blongs to user
            console.log(typeof(result.id))
            console.log(user._id.toString())
            if(result.id == user._id){
                //reset user password
                user.password = new_password
                await user.save()
                res.status(200).send({
                    message:"password reset successfull",
                    success:true
                })

            }else{
                res.status(400).send({
                    message:"password cannot be reseted",
                    success:true
                })
            }

        }else{
            res.status(400).send({
                message:"password cannot be reseted",
                success:true
            })
        }
        
    }catch(error){
        console.log(error)
        if (error.name === "ValidationError") {
            
            Object.keys(error.errors).forEach((key) => {
                err.errors[key] = error.errors[key].message;
            });
        
            res.status(400).send(err);
        }else{
            console.log(error)
            return res.status(500).send({message:"Something went wrong"});
        }
    }


    
    
   }
}

export default UserController