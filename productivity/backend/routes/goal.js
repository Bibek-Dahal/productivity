import authMiddleware from '../middlewares/authMiddleware.js'
import express from 'express'
import GoalController from '../controllers/goalController.js'
const router = express.Router()
import GoalValidation from '../middlewares/validations/goal.js'


//creates goal
router.post('/create/:groupId/:taskId',[
    authMiddleware,
    GoalValidation.create,
    GoalController.create
])


//list all goals of particular task
router.get('/list/:groupId/:taskId',[
    authMiddleware,
    GoalController.list
])

//retrive all goals of particular task
router.get('/retrive/:groupId/:taskId/:goalId',[
    authMiddleware,
    GoalController.retrive
])

//update goal of particular task
router.put('/update/:groupId/:taskId/:goalId',[
    authMiddleware,
    GoalController.update
])

//update goal of particular task
router.delete('/delete/:groupId/:taskId/:goalId',[
    authMiddleware,
    GoalController.delete
])

export default router