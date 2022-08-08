//handls all about tasks operation
import express from 'express'
const router = express.Router()
import TaskController from '../controllers/taskController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { validations } from '../middlewares/validations.js'
import TaskValidations from '../middlewares/validations/task.js'

router.put('/create/:groupId',[authMiddleware,TaskValidations.createTask,TaskController.create])

export default router