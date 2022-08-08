import Group from "../models/Group.js"
import { displayMongooseValidationError } from "../utils/displayValidationError.js"
import User from "../models/User.js"
class GroupController{
    /*
        creates a group
    */

    static create = async (req,res)=>{
        const {name} = req.body
        try{
            req.body.user = req.user_id
            req.body.members = [req.user_id]
            console.log(req.body)
            const group = await Group.create(req.body)
            // console.log(await group.save())
            res.status(201).send({
                message:"group created",
                group:group,
                success: true

            })

        }catch(error){
            displayMongooseValidationError(req,res,error)
        }
    }

  

    /*
        delete group
    */
    static delete = async (req,res,next)=>{
        try{
            const group = await Group.findOne({_id:req.params.groupId,user:req.user_id})
            console.log(group)
            if(group){
                await group.delete()

                res.status(200).send({
                    message:"deleted",
                    success:true
                })
                
            }else{
                res.status(400).send({
                    message:"delete operation cannot be performed"
                })
            }
           
        }catch(error){
            res.status(500).send({
                "message":"something went wrong"
            })
        }
    }

    /*
        update group
    */
   static update = async (req,res)=>{
        try{
            console.log('inside try')
            const group = await Group.findOne({_id:req.params.groupId,user:req.user_id})
            if(group){
                // group.updateOne()
                const updated_group = await group.updateOne({$set:{name:req.body.name,members:req.body.members}},{new:true})
                res.status(200).send({
                    message:"update successfull",
                    success:true,
                })
            }else{
                res.status(403).send({
                    message:"operation could not be performed"
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                message:"operation could not be performed"
            })
        }
   }

   static retrive = async (req,res)=>{
        try{
            const group = await Group.findOne({_id:req.params.groupId,user:req.user_id}) //fetch group
            // console.log(group)
            if(group){
                //runs if user is owner of group
                res.status(200).send({
                    group:group,
                    success:true
                })
                
            }else{
                res.status(404).send({
                    message:"page not found"
                })
            }
        }catch(error){
            console.log(error)
            res.status(500).send({
                "message":"cannot retrive group"
            })
        }
    } 

    /*
        get group of user belongs to
    */

    static getGroups = async (req,res,next)=>{
        try{
            console.log(req.user_id)
            const groups = await Group.find({user:req.user_id})
            // console.log(user.populated('groups'))
            // console.log(groups)
            res.status(200).send({
                success: true,
                groups: groups
                
            })
        }catch(error){
            console.log(error)
            res.status(500).send({
                message: "something went wrong"
            })
        }
    }

    

}

export default GroupController