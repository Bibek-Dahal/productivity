import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },

    text: {
        type: String,
        required: true

    },

    created_at : {
        type: Date,
        default: Date.now()
    }
})

const Chat = mongoose.model('Chat',chatSchema)

export default Chat
