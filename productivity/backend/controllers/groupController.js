import Group from "../models/Group.js"
import { displayMongooseValidationError } from "../utils/displayValidationError.js"
import User from "../models/User.js"
import sendMail from '../utils/sendMail.js'
import jwt from "jsonwebtoken";
import { Base64Encoder,Base64Decoder } from "base64-encoding";
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
    const {name,members,description} = req.body
        try{
            console.log('inside try')
            const group = await Group.findOne({_id:req.params.groupId,user:req.user_id})
            if(group){
                // group.updateOne()
                const updated_group = await group.updateOne({$set:{name:name,members:members,description:description}},{new:true})
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
            // const group = await Group.findOne({_id:req.params.groupId,user:req.user_id}) //fetch group

            const group = await Group.findOne({_id:req.params.groupId},{password:0}).populate('members','-password')
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
            const groups = await Group.find({$or:[{user:req.user_id},{members:req.user_id}]})
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

    static inveteMember = async (req,res)=>{
        const {email,group_name} = req.body
        try{
           
            const users = await User.find({email:{$in:email}},{_id:1,email:1})
            if(users){
                //check if group exists and invitor is owner of group
                const group = await Group.findOne({name:group_name,user:req.user_id})
                if(group){
                    sendMail(users,"Group Invitation Email",{group: group})
                    res.status(200).send({
                        message:"invitation send",
                        success: true
                    })
                }else{
                    res.status(403).send({
                        message: "sorry, the sender is not owner of the group",
                        success: false
                    })
                }
                
            }else{
                res.status(404).send({message:"user doesnot exist"})
            }

        }catch(error){
            console.log(error)
            res.status(500).send({message:"something went wrong"})
        }   
    }


    //accept group invitation
    static acceptGroupInvitation = async (req,res)=>{
        console.log(req.params)
        const {groupName,token} = req.params
        try{
            const result = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            const decodedGroup = new TextDecoder().decode(new Base64Decoder().decode(groupName))
            console.log(decodedGroup)
            if(result && decodedGroup){
                const user = await User.findOne({_id: result.id})
                const group = await Group.findOne({name:decodedGroup})
                // console.log(group)

                //checks if user already belongs to group
                const belongs = await group.members.includes(user._id)
                console.log(belongs)
                if(!belongs){
                    console.log('inside if')
                    await group.updateOne({$push:{members:user._id}})
                    
                    // res.status(200).send({
                    //     message: "user joined in the group",
                    //     success: true
                    // })
                    res.redirect(`http://127.0.0.1:3000/group/${group._id}?msg=group joined successfully`)
                }else{
                    console.log('inside else')
                    res.redirect(`http://127.0.0.1:3000/group/${group._id}?msg=already in the group`)
                }
            }else{
                res.status(400).send({
                    message:"sorry, the operations could not be performed",
                    success: false
                })
            }

        }catch(error){
            console.log(error)
            res.status(500).send({
                message:"something went wrong",
                success: false
            })
        }
    }

    static getGroupMembersDetail = async (req,res,next)=>{
        const {groupId} = req.params
        console.log(groupId)
        try{
            const group = await Group.findOne({_id:groupId})
            console.log(group.members)
            const members = await User.find({_id:{$in:group.members}})

            if(group && members){
                console.log('group found')
                // console.log(group)
                res.status(200).send({
                    users: members,
                    success: true
                })
            }else{
                res.status(404).send({
                    success: false,
                })
            }
            }catch(error){
                res.status(500).send({
                    message: "something went worng"
                })
            }
            

    }

}

export default GroupController