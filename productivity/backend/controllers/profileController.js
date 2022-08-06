import User from "../models/User.js"
import Joi from "joi"

class ProfileController{
    /*
        fetch user profile
    */

    static async profile(req,res){
        try{
            let user = await User.findById(req.user_id,{password:0})
            console.log(user)
            res.status(200).send({
                data:user,
                success:true
            })
        }catch(error){
            res.status(500).send({
                message:"Something went wrong",
                success:false
            })
        }
    }

    static updateProfile = async (req,res)=>{
        res.send("hello")
        try{
            if(req.file){
                let cloud_res = await cloudinary.v2.uploader.upload(req.file.path,{folder:"node"})
                req.body.avatar = cloud_res.secure_url
            }
            const user = await User.findOneAndUpdate(req.user_id,req.body)

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

    
        
    

    
}

export default ProfileController