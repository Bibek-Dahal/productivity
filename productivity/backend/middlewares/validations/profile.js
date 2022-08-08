import Joi from "joi"
import showValidationsError from "../../utils/showValidationsError.js"

class ProfileValidation{
    /*
            update profile validation
        */
            static updateProfile(req,res,next){
    
                const schema = Joi.object({
                    first_name: Joi.
                        string().
                        alphanum().
                        min(3).
                        max(30).
                        required(),
        
                    middle_name: Joi.
                        string().
                        trim().
                        min(3).
                        max(30),
        
                    last_name: Joi.
                        string().
                        trim().
                        alphanum().
                        min(3).
                        max(30).
                        required(),
        
                    skills: Joi.array().
                        items(Joi.string().trim()).
                        max(10).
                        required()
                
                })
        
                showValidationsError(req,res,next,schema)
                
            }
        
        
}

export default ProfileValidation