import express from 'express'
const router = express.Router()
import UserController from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

import {upload} from '../config/multer_config.js'
import AuthValidation from '../middlewares/validations/auth.js'



//public routes
router.post('/register',[upload.single('avatar'),AuthValidation.register,UserController.register])
router.post('/login',[AuthValidation.login,UserController.login])

//sneds password reset email to user
router.post('/password-reset',[AuthValidation.passwordResetEmail,UserController.passwordResetEmail])

router.post('/password-reset/:userId/:token',UserController.passwordReset)

//protected routes

router.put('/password-change',[authMiddleware,AuthValidation.passwordChange,UserController.passwordChange])

export default router