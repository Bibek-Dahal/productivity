
import Group from "../models/Group.js"
import User from "../models/User.js"
import sendMail from "../utils/sendMail.js"

class GoalController{

    //creates task
    static create = async (req,res)=>{
        try{
            const {groupId,taskId} = req.params
            //checks if group exists and user belong to members of group and task_user and request id matches 
            const group = await Group.findOne({_id:groupId,members:req.user_id,"task._id":taskId,"task.task_user":req.user_id})
            if(group){
                req.body.task_user = req.user_id
                const updated_group = await Group.updateOne({_id:groupId,members:req.user_id,"task._id":taskId,"task.task_user":req.user_id},{$push:{'task.$.task_goals':req.body}},{new:true})
                res.status(200).send({
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
            res.status(500).send(
                {message:'something went wrong'}
            )
        }

    }

    //list goals of particular task
    static list = async(req,res)=>{
        try{
            const {groupId,taskId} = req.params
            const group = await Group.findOne({_id:groupId,members:req.user_id},{"task":{$elemMatch:{_id:taskId}}})
            

            if(group){
                res.status(200).send({
                    goals: group.task[0].task_goals,
                    success: true
                })
            }else{
                res.status(404).send({
                    message: 'group not found',
                    success: false
                })
            }

        }catch(error){
            console.log(error)
            res.status(500).send({
                message: 'something went wrong'
            })
        }
        
    }

    //retrive goal with given id
    static retrive = async(req,res)=>{
        try{
            const {groupId,taskId,goalId} = req.params
            
            const group = await Group.findOne({_id:groupId,members:req.user_id,"task._id":taskId},{"task":{$elemMatch:{_id:taskId}}})
            console.log(group)

            
            
            let goal = group?.task[0].task_goals.filter((goal)=>goal._id==goalId)
            if(goal){
                res.status(200).send({
                    goal: goal[0],
                    success: true
                })
            }else{
                res.status(404).send({
                    message: 'goal not found',
                    success: false
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                message: 'something went wrong'
            })
        }
    }

    //update goal
    static update = async(req,res)=>{
        try{
            const {groupId,taskId,goalId} = req.params
            const {goals_title,goals_description,goals_deadline,goals_is_completed} = req.body
            
            //find group if user belongs to group and task is created by requested user
            const group = await Group.findOne({_id:groupId,members:req.user_id,"task._id":taskId,"task.task_user":req.user_id},{members:1}).populate('members')

            if(group){
                await Group.updateOne(
                    {_id:groupId},
                    {
                        $set:{
                            "task.$[].task_goals.$[goal].goals_description": goals_description,
                            "task.$[].task_goals.$[goal].goals_title": goals_title,
                            "task.$[].task_goals.$[goal].goals_deadline": goals_deadline,
                            "task.$[].task_goals.$[goal].goals_is_completed": goals_is_completed,
                        },
                        
                        
                    },
                    {
                        arrayFilters:[{"goal._id":goalId}]
                    })
                
                
                if(goals_is_completed){
                    //fetch the user
                    const user = await User.findOne({_id:req.user_id})

                    //retrives emails of users from group
                    const members_email = group.members.map((member)=>member.email)

                    
                    sendMail(user,"Goal Completed",{emails:members_email})
                }

                res.status(200).send({
                    success: true
                })

            }else{
                res.status(403).send({
                    message: 'operation cannot be performed'
                })
            }

        }catch(error){
            console.log(error)
            res.status(500).send({
                message: 'something went wrong'
            })
        }
    }

    static delete = async(req,res)=>{
        try{
            const {groupId,taskId,goalId} = req.params
            //find group if user belongs to group and task is created by requested user
            const group = await Group.findOne({_id:groupId,members:req.user_id,"task._id":taskId,"task.task_user":req.user_id},{members:1}).populate('members')

            if(group){
                
                await Group.updateOne(
                    {_id:groupId},
                    {
                        $pull:{
                            task:{
                                task_goals:{ $elemMatch:{_id:goalId}}
                            }
                        }
                    }
                )
                res.status(200).send({
                    message: "goal deleted",
                    success: true
                })
            }else{
                res.status(403).send({
                    message: 'cannot perform the operation'
                })

            }
        }catch(error){
            // console.log(error)
            res.status(500).send({
                message: 'something went wrong'
            })
        }
    }
}

export default GoalController