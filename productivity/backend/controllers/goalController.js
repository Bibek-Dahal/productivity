
import Group from "../models/Group.js"

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

            let goal = group.task[0].task_goals.filter((goal)=>goal._id==goalId)

            
            if(group){
                res.status(200).send({
                    goal: goal[0],
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
}

export default GoalController