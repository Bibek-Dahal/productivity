/*
    handles all about task operation
*/
import Group from "../models/Group.js"

class TaskController{
    static create = async (req,res)=>{
        try{
            console.log(req.params.groupId)
            //check if group exists and user belong to members of group
            const group = await Group.findOne({_id:req.params.groupId,members:req.user_id})
            console.log(group)
            if(group){

                    req.body.task_user = req.user_id
                    const updated_group = await group.updateOne({$push:{task:req.body}},{new:true})
                    res.status(200).send({
                        group:updated_group,
                        success:true
                    })

            }else{
                res.status(404).send({
                    message: "group doesnot exists",
                    success: false
                })
            }

        }catch(error){
           console.log(error)
            res.status(500).send({
                message:"internal server error",
            })

        }
    }

    static update = async (req,res)=>{
        try{
            const {groupId,taskId} = req.params
            const {task_title,task_description,task_is_completed,task_deadline} = req.body

            //retrive the group only if user belongs to group,and task is created by user
            const group = await Group.findOne({_id:groupId,members:req.user_id,"task._id":taskId,"task.task_user":req.user_id})

            if(group){
                const updated_task = await Group.updateOne(
                                        {_id:groupId,"task._id":taskId},
                                        {
                                            $set:{
                                                "task.$.task_title": task_title,
                                                "task.$.task_description": task_description,
                                                "task.$.task_deadline": task_deadline,
                                                "task.$.task_is_completed": task_is_completed

                                            }
                                        }
                                    )
                console.log('inside group')
                res.status(200).send({
                    message: "group updated",
                    success: true,
                    
                })
                
            }else{
                res.status(404).send({
                    message:"gorup not found",
                    success: false
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                message: "something went wrong"
            })
        }
        

    }

    static delete = async(req,res,next)=>{
        try{
            const {groupId,taskId} = req.params
            const group = await Group.findOne({_id:groupId,members:req.user_id,"task._id":taskId,"task.task_user":req.user_id})

            if(group){
                const updated_group = await group.updateOne(
                    // {_id:groupId,members:req.user_id,"task._id":taskId,"task.task_user":req.user_id},
                    {$pull:{task:{_id:taskId}}}
                )

                console.log(group)
                res.status(200).send({
                    message: "task deleted successfully",
                    success: true
                })
            }else{
                res.status(403).send({
                    message: "sorry, the user is not owner of the task",
                    success: false
                })
            }
            
        }catch(error){
            res.status(500).send({
                message: "something went wrong"
            })
        }

    }

    static retrive = async(req,res,next)=>{
        try{
            const {groupId,taskId} = req.params
            const group = await Group.findOne({_id:groupId,members:req.user_id,"task._id":taskId},{task:1})

            if(group){
                // console.log(group)
                
                res.status(200).send({
                    task: group.task.find((task)=> task._id == taskId),
                    success: true
                })
            }else{
                res.status(403).send({
                    message: "user doesnot belongs to group"
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                message: "something went wrong",

            })
        }
    }
}

export default TaskController