import express from 'express'
const router = express.Router()
import authMiddleware from '../middlewares/authMiddleware.js'
import GroupController from '../controllers/groupController.js'
import GroupValidations from '../middlewares/validations/group.js'
import task from './task.js'
import AuthValidation from '../middlewares/validations/auth.js'
import chat from './chat.js'

router.use('/task',task) //handles task routes
router.use('/chat',chat)


//create group
router.post('/create',[
    authMiddleware,
    GroupValidations.create,
    GroupController.create
])

//delete group
router.delete('/:groupId/delete',[
    authMiddleware,
    GroupController.delete
])

//retrive gorup
router.get('/:groupId(\[a-zA-Z0-9]{24}\)/retrive',[
    authMiddleware,
    GroupController.retrive
])

//update group
router.put('/:groupId(\[a-zA-Z0-9]{24}\)/update',[
    authMiddleware,
    GroupValidations.update,
    GroupController.update
])

//finds groups user belongs to
router.get('/get-user-groups',[
    authMiddleware,
    GroupController.getGroups
]) 

//invite member to group

router.post('/invite-member',[authMiddleware,GroupValidations.invite,GroupController.inveteMember])
router.post('/:groupName/join/:token',GroupController.acceptGroupInvitation)


//check if group exists
router.post('/group-exists',[
    GroupValidations.groupExists,
    GroupController.groupExists

])

//leave group
router.post('/leave/:groupId',[authMiddleware,GroupController.leaveGroup])

router.post('/kick/:groupId/:memberId',[authMiddleware,GroupController.kickUserFromGroup])

// router.get('/history')

//get details of all members of group
//router.get('/members-details/:groupId(\[a-zA-Z0-9]{24}\)',[authMiddleware,GroupController.getGroupMembersDetail])

export default router

