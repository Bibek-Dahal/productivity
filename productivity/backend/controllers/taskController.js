/*
    handles all about task operation
*/
import Group from "../models/Group.js"

class TaskController{
    static create = async (req,res)=>{
        try{
 
            const group = await Group.findOne({_id:req.params.groupId})

            console.log(req.body)
            //checks if group exists and user belongs to that group
            const belongs = await Group.find({_id:group._id,members:req.user_id})
            if(group.length != 0 && belongs.length != 0){
                req.body.task_user = req.user_id
                const updated_group = await Group.findOneAndUpdate({_id:group._id},{$push:{task:req.body}},{new:true})
                res.status(200).send({
                    group:updated_group,
                    success:true
                })
                
            }else{

                return res.status(400).send({
                    message:"cannot create task"
                })

            }


        }catch(error){
           console.log(error)
            res.status(500).send({
                message:"internal server error",
            })

        }
    }
}

export default TaskController