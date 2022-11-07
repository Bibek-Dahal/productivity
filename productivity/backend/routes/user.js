import express from 'express'
import UserController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/history',[authMiddleware,UserController.userHistory])

export default router