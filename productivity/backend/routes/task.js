//handls all about tasks operation
import express from 'express'
const router = express.Router()
import TaskController from '../controllers/taskController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import TaskValidations from '../middlewares/validations/task.js'
import goal from './goal.js'

//forward route to goal 
router.use('/goal',goal)

//create task
router.post('/create/:groupId',[authMiddleware,TaskValidations.createTask,TaskController.create])

//update task
router.put('/update/:groupId/:taskId',[authMiddleware,TaskValidations.updateTask,TaskController.update])

//delete task
router.delete('/delete/:groupId/:taskId',[authMiddleware,TaskController.delete])


//retrive task
router.get('/retrive/:groupId/:taskId',[authMiddleware,TaskController.retrive])

export default router