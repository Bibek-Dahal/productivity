import express from 'express'
const router = express.Router()
import UserController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { validations } from '../middlewares/validations.js'
import {upload} from '../config/multer_config.js'



//public routes
router.post('/register',[upload.single('avatar'),validations.register,UserController.register])
router.post('/login',[validations.login,UserController.login])

//sneds password reset email to user
router.post('/password-reset',[validations.passwordResetEmail,UserController.passwordResetEmail])

router.post('/password-reset/:userId/:token',UserController.passwordReset)

//protected routes

router.put('/password-change',[authMiddleware,validations.passwordChange,UserController.passwordChange])

export default router