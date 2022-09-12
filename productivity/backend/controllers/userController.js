import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { Base64Encoder,Base64Decoder } from "base64-encoding";
import transporter from "../config/mail_config.js";
import cloudinary from "../config/cloudinary.js";
import { displayMongooseValidationError } from "../utils/displayValidationError.js";
import sendMail from '../utils/sendMail.js'

class UserController{
    //function for registering new user
    static async register(req,res){

        try{
            if(req.file){
                let cloud_res = await cloudinary.v2.uploader.upload(req.file.path,{folder:"node"})
                req.body.avatar = cloud_res.secure_url
            }
            
            let user = User(req.body)
            await user.save()

            await sendMail(user,"User Verification Email")
        
            const data = {
                message:"user created successfully",
                success:true,
                
            }
            res.status(201).send(data)
            
  
        }catch(error){
            // console.log(error)
            // console.log(typeof(error))
            // console.log('hello i am called')
            displayMongooseValidationError(req,res,error)
           
        } 
    }


    //verify user
    static verifyUser = async (req,res)=>{
        const {userId,token} = req.params
        let result;
        let id;
        try{
             try{
                //verify jwt
                result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
                // const decoder = await new Base64Decoder().optimize();
                //decodes the userId
                id = new TextDecoder().decode(new Base64Decoder().decode(userId))

             }catch(error){
                return res.status(400).send({message:"Token Expired"});
             }

             let user = await User.findByIdAndUpdate(id,{is_active:true})
             if(result && user){
                
                await user.save()
                res.redirect('http://127.0.0.1:3000/login')

             }else{
                res.status(400).send({
                    message: "user verification failed",
                    success : false
                })
             }
    
        }catch(error){
            console.log(error)
            res.status(500).send({
                "message":"something went wrong",
            })
        }
    }

    static resendVerificationMail = async (req,res)=>{
        try{
            const user = await User.findOne({email:req.body.email})
            //sends mail if user exists and is_active is false
            if(user && user.is_active == false){
                await sendMail(user,"User Verification Email")
                res.status(200).send({
                    message:"verification email sent",
                    success: true
                })
            }else{
                //sends mail if user doesnot exist same logic used by other site
                res.status(200).send({
                    message:"mail sent",
                    success: true
                })
            }
        }catch(error){
            res.status(500).send({
                message:"semithing went wrong"
            })
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
                    //determines whether user can login or not
                    if(!user.is_active){
                        res.status(403).send({
                            message: "please verify your email",
                            success: false
                        })
                    }else{
                            
                        //log the user
                        const token = await jwt.sign({
                            id: user._id
                            }, process.env.JWT_SECRET_KEY, { expiresIn: 15*24*60*60 });
                        
                            res.status(200).send({
                            message:"login successful",
                            token:token,
                            success:true
                        })
                    }
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
        const {old_password,new_password} = req.body
        
        try{
            let user = await User.findById(req.user_id)
            let result = await User.checkUser(old_password,user.password)
            if(result){
        
                //change the password
                user.password = new_password
                await user.save()
                res.status(200).send({
                    message:"password changed successfull",
                    success:true
                })
        
            }else{
                
                res.status(400).send({
                    errors:{
                        old_password:"old password does not match current password"
                    },
                    message:"password change failed"

                })
                
            }

        }catch(error){
            displayMongooseValidationError(req,res,error)
        }
        
    }

    /*
        send password reset email
    */
    static async passwordResetEmail(req,res){
        const {email} = req.body
        console.log(email)

        try{
            const encoder = await new Base64Encoder({ url: true }).optimize();
            let user = await User.findOne({email:email})
            console.log(user)
            if(user !== null){

                await sendMail(user,"Password Reset Email")
                //sent mail
                res.status(200).send({
                    message:"password reset email sent",
                    success:true
                })
                
                
                
                // let encodedText = encoder.encode(new TextEncoder().encode(user._id))
                // const token = await jwt.sign({
                //     id: user._id
                //     }, process.env.JWT_SECRET_KEY, { expiresIn: 5*24*60*60 });

                // console.log(transporter)
                // let info = await transporter.sendMail({
                
                // to: "bibekdahal479@gmail.com", // list of receivers
                // subject: "Password Reset Email", // Subject line
                // // text: `click on the link 127.0.0.1:8000/${encodedText}/${token} to reset your password`, // plain text body
                // html: `<p>click on the link 127.0.0.1:8000/api/password-reset/${encodedText}/${token} to reset your password</p>`, // html body
                // });


                // console.log(info.messageId)
                
            }else{
                res.status(200).send({
                    message:"password reset email sent",
                    success: true
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
        displayMongooseValidationError(req,res,error)
    }

   }

   static findUserByEmail = async (req,res)=>{
    try{
        let regex = new RegExp(`(${req.body.email})@gmail.com`)
        console.log(regex)
        const user = await User.find({email:{$regex:regex, $options: 'i'}},{password:0})
        if(user){
            res.status(200).send({
                user: user,
                success: true
            })
        }else{
            res.status(404).send({
                message: "user not found",
                success: false
            })
        }
    }catch(error){
        res.status(500).send({
            message: "something went wrong"
        })
    }
    
   }
}

export default UserController