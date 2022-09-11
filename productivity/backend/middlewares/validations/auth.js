import Joi from "joi"
import User from "../../models/User.js";
import showValidationsError from "../../utils/showValidationsError.js"
const pswdPtrn = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$/;


const userLookup = async (email,helpers)=>{
    let user;
    try{
        console.log('inside userlookup')
        // user = await User.findOne({email:email})
        if(email==="bibekdahal47@gmail.com"){
            // console.log(helpers)
            console.log('email already exists')
            throw new Error('sorry babe');
        }
        console.log('hello babs')
        return email
        
    }catch(error){
        console.log(error)
    }
    
  
}

class AuthValidation{
    /*
        validation for registration
    */
        static register(req,res,next){

            const schema = Joi.object({
                username: Joi.
                    string().
                    trim().
                    alphanum().
                    min(3).
                    max(50).
                    required(),
                    
    
                email: Joi.
                    string().
                    trim().
                    email().
                    required().
                    custom(userLookup,"custom validation").
                    messages({
                        'any.custom':'email already exists'
                    }),
            
                password: Joi.
                    string().
                    trim().
                    pattern(new RegExp(pswdPtrn)).
                    required().
                    messages({
                        'string.pattern.base':'password must contain atleast one digit one special character and one uppre case letter'
                    }),
            
                repeat_password: Joi.
                    any().
                    valid(Joi.ref('password')).
                    required().
                    messages({
                        'any.only': 'password and repeat password do not match',
                        'any.required':'{{#label}} is required'
                    }),

                skills:Joi.
                    array().
                    items(Joi.string().trim()).
                    max(15)

            })
    
            showValidationsError(req,res,next,schema)
            
        }
 
    
        static login(req,res,next){
            const schema = Joi.object({
                email: Joi.
                    string().
                    trim().
                    email().
                    required(),
    
                password: Joi.
                    string().
                    trim().
                    required()
        
            })
    
            showValidationsError(req,res,next,schema)
            
    
        }
    
        static passwordChange(req,res,next){
            const schema = Joi.object({
                old_password:Joi.
                    string().
                    trim().
                    required(),
    
                new_password: Joi.
                    string().
                    trim().
                    pattern(new RegExp(pswdPtrn)).
                    required().
                    messages({
                        'string.pattern.base':'password must contain atleast one digit one special character and one uppre case letter'
                    }),
                
                repeat_password: Joi.
                    any().
                    valid(Joi.ref('new_password')).
                    required().
                    messages({
                        'any.only': 'password and repeat password do not match',
                        'any.required':'{{#label}} is required'
                    }) 
    
            })
    
            showValidationsError(req,res,next,schema)
        }
    
        static passwordResetEmail(req,res,next){
            const schema = Joi.object({
                email: Joi.
                    string().
                    trim().
                    email().
                    required(),
            })
    
            showValidationsError(req,res,next,schema)
        }
        
    
        static passwordReset(req,res,next){
            const schema = Joi.object({
                new_password: Joi.
                    string().
                    trim().
                    pattern(new RegExp(pswdPtrn)).
                    required().
                    messages({
                        'string.pattern.base':'password must contain atleast one digit one special character and one uppre case letter'
                    }),
                
                repeat_password: Joi.
                    any().
                    valid(Joi.ref('new_password')).
                    required().
                    messages({
                        'any.only': 'password and repeat password do not match',
                        'any.required':'{{#label}} is required'
                    }) 
    
            })
            
            showValidationsError(req,res,next,schema)
        }
    
        
        /*
            Group Controller Validations
        */
    
}

export default AuthValidation