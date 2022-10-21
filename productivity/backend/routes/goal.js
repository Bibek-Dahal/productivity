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

//list all goals of particular task
router.get('/retrive/:groupId/:taskId/:goalId',[
    authMiddleware,
    GoalController.retrive
])

export default router