import Joi from "joi"
import showValidationsError from "../../utils/showValidationsError.js"

class GroupValidation{
    static create = (req,res,next)=>{
        const schema = Joi.object({
            name: Joi.
                string().
                trim().
                min(3).
                max(30).
                required(),
            
            title: Joi.
                string().
                trim().
                min(3).
                max(30).
                required(),

            description: Joi.
                string().
                trim().
                max(100).
                required(),

            members: Joi.
                array().
                items(Joi.string().trim()).
                max(10).
                required(),
            
            task: Joi.
                array().
                items(
                    Joi.object({
                        task_user: Joi.string().trim().alphanum().required(),
                        task_title: Joi.string().trim().min(3).max(30).required(),
                        task_description: Joi.string().trim().max(100).required(),
                        task_deadline: Joi.date().iso().required(),
                        task_is_completed: Joi.boolean().default(false),
                        task_goals: Joi.
                            array().
                            items(
                                Joi.object({
                                    goals_user: Joi.string().trim().alphanum().required(),
                                    goals_title: Joi.string().trim().min(3).max(30).required(),
                                    goals_description: Joi.string().trim().max(100).required(),
                                    goals_deadline: Joi.date().iso().required(),
                                    goals_is_completed: Joi.boolean().default(false)
                                })
                            ).required()
        
                    })
                )
        })

        showValidationsError(req,res,next,schema)

    }

    static update = (req,res,next)=>{

        const schema = Joi.object({
            name: Joi.
                string().
                trim().
                min(3).
                max(30).
                required(),

            members: Joi.
                array().
                items(Joi.string().trim()).
                max(10).
                required(),
        })

        showValidationsError(req,res,next,schema)

    }

    static invite = (req,res,next)=>{
        const schema = Joi.object({
            email: Joi.
                string().
                trim().
                email().
                required(),
            group_name: Joi.
                string().
                required()
        })

        showValidationsError(req,res,next,schema)
    }
}
export default GroupValidation