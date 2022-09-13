import authMiddleware from '../middlewares/authMiddleware.js'
import ChatController from '../controllers/chatController.js'
import express from 'express'
import Chat from '../models/Chat.js'

const router = express.Router()

router.get('/:groupId',[authMiddleware,ChatController.listChat])

export default router