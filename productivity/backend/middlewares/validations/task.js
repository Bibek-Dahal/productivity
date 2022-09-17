import Joi from "joi"
import showValidationsError from "../../utils/showValidationsError.js"

class TaskValidations{
    /*
        validation for create task
    */

        static createTask = (req,res,next)=>{
            const schema = Joi.object({
                // task: Joi.object({
                        task_title: Joi.string().trim().min(3).max(30).required(),
                        task_description: Joi.string().trim().max(100).required(),
                        task_deadline: Joi.date().iso().required(),
                        task_is_completed: Joi.boolean().default(false),
                        task_goals: Joi.
                            array().
                            items(
                                Joi.object({
                                    goals_title: Joi.string().trim().min(3).max(30).required(),
                                    goals_description: Joi.string().trim().max(100).required(),
                                    goals_deadline: Joi.date().iso().required(),
                                    goals_is_completed: Joi.boolean().default(false)
                                })
                            )
                            // .required()
    
                    // }).required()   
            })
    
            showValidationsError(req,res,next,schema)
        }

        static updateTask = (req,res,next)=>{
            const schema = Joi.object({
                task_title: Joi.string().trim().min(3).max(30).required(),
                task_description: Joi.string().trim().max(100).required(),
                task_deadline: Joi.date().iso().required(),
                task_is_completed: Joi.boolean().default(false),
            })

            showValidationsError(req,res,next,schema)
        }
    
}

export default TaskValidations