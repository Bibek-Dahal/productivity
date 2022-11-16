import Joi from "joi"
import showValidationsError from "../../utils/showValidationsError.js"

class ProfileValidation{
    /*
            update profile validation
        */
            static updateProfile(req,res,next){
    
                const schema = Joi.object({
                    username: Joi.
                        string().
                        alphanum().
                        min(3).
                        max(30).
                        required(),
        
                    skills: Joi.array().
                        items(Joi.string().trim()).
                        max(10)
                        
                
                })
        
                showValidationsError(req,res,next,schema)
                
            }
        
        
}

export default ProfileValidation
