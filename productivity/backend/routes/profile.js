import express from 'express'
import ProfileController from '../controllers/profileController.js'
const router = express.Router()
import authMiddleware from '../middlewares/authMiddleware.js'
import ProfileValidation from '../middlewares/validations/profile.js'
import {upload} from '../config/multer_config.js'


router.get('',[authMiddleware,ProfileController.profile])
router.put('/update',[authMiddleware,upload.single('avatar'),ProfileValidation.updateProfile,ProfileController.updateProfile])


export default router