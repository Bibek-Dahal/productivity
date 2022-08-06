import express from 'express'
import ProfileController from '../controllers/profileController.js'
const router = express.Router()
import authMiddleware from '../middlewares/authMiddleware.js'
import { validations } from '../middlewares/validations.js'



router.get('',[authMiddleware,ProfileController.profile])
router.put('/update-profile',[authMiddleware,validations.updateProfile,ProfileController.updateProfile])

export default router