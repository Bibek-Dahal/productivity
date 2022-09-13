import Chat from "../models/Chat.js"
import Group from "../models/Group.js"

class ChatController{
    

    static listChat = async (req,res,next)=>{
        const {groupId} = req.params
        try{
            //find group on the basis of groupId
            const group = await Group.findOne({_id:groupId})
            if(group){
                //checks if user blongs to the group
                console.log(req.user_id)
                if(group.members.includes(req.user_id)){
                    const chat = await Chat.find({group:groupId})
                    res.status(200).send({
                        chats: chat,
                        success: true
                    })

                }else{
                    res.status(403).send({
                        success: false,
                        message: "user doesnot belongs to the group"
                    })
                }
            }else{
                res.status(404).send({
                    success: false,
                    message: "group not found"
                })
            }
            
        }catch(error){
            console.log(error)
            res.status(500).send({
                message: "something went worng"
            })
        }
        
    }
}

export default ChatController