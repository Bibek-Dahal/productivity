import Joi from "joi"
import showValidationsError from "../../utils/showValidationsError.js"
import Group from "../../models/Group.js"
class GroupValidation{
    static create = (req,res,next)=>{
        const schema = Joi.object({
            name: Joi.
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
                max(10),
                
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
                items(Joi.string()).
                max(10).
                required(),

            description: Joi.
                string().
                trim().
                max(100).
                required()
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

    static groupExists = async (req,res,next)=>{
        const schema = Joi.object({
            name: Joi.
                string().
                trim().
                min(3).
                max(30).
                required(),
        })
        
        const { error, value } = schema.validate(req.body,{abortEarly:false,errors:{label:'key'},wrap: {label: false}});
        
    if(!error){

        const name = req.body.name
        const group = await Group.findOne({name:name})
        if(!group){

            res.status(200).send({
                success: true
            })

        }else{
            res.status(400).send({
                success: false,
                message: "group with groupname already exists"
            })
        }


    }else{
        const err = error.details

        let validationErrors = {}
        err.forEach((item) => {
            validationErrors[item.context.key] = item.message
        });
        res.status(400).send(
            {
                errors:{...validationErrors},
                success:false
            }
        ) 
    }


    }
}
export default GroupValidation
