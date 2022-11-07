import Joi from "joi"
import showValidationsError from "../../utils/showValidationsError.js"
import Group from "../../models/Group.js"

class GoalValidation{
    static create = (req,res,next)=>{
        const schema = Joi.object({
            // task: Joi.object({
                    
                    
            goals_title: Joi.string().trim().min(3).max(30).required(),
            goals_description: Joi.string().trim().max(100).required(),
            goals_deadline: Joi.date().iso().required(),
            goals_is_completed: Joi.boolean().default(false)
                          
        })

        showValidationsError(req,res,next,schema)
    }

}

export default GoalValidation