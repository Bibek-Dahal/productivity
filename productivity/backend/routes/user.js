import express from 'express'
import UserController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/history',[authMiddleware,UserController.userHistory])
router.get('/monthly-report/:groupId',[authMiddleware,UserController.monthlyReport])

export default router