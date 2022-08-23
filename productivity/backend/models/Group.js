import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const groupSchema = mongoose.Schema({
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    "name":{
        type: String,
        unique:true,
        required: true,
        trim: true,
        maxLength: 30,
        minLength: 3
    },
    "description": {
        type: String,
        required: true,
        trim: true
    },
    "members":[
        {type:mongoose.Schema.Types.ObjectId,ref: 'User'}
    ],
    "task":[
        mongoose.Schema({
            "task_user":{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            "task_title":{
                type: String,
                required: true,
                trim: true,
                maxLength: 30,
                minLength: 3
            },
            "task_goals":[
                mongoose.Schema({
                    "goals_title":{
                        type:String,
                        required:true,
                        trim:true,
                        maxLength:30,
                        minLength:3
                    },
                    "goals_description":{
                        type:String,
                        required:true,
                        trim: true,
                    },
                    "goals_deadline": {
                        type: Date,
                        required: true
                    },
                    "goals_is_completed": {
                        type: Boolean,
                        default: false
                    }
                },
                {
                    timestamps:{
                        createdAt: 'goals_created_at', 
                        updatedAt: 'goals_updated_at'
                    },
                })
            ],
            "task_description":{
                type: String,
                required: true,
                trim: true,

            },
            "task_deadline": {
                type: Date,
                required: true
            },
            "task_is_completed": {
                type: Boolean,
                default: false
            }
        },
        {
            timestamps:{
                createdAt: 'task_created_at', 
                updatedAt: 'task_updated_at'
            },
        })
    ]
},
{
    timestamps:{
        createdAt: 'group_created_at', 
        updatedAt: 'group_updated_at'
    },
})

groupSchema.plugin(uniqueValidator,{ message: 'group with group {PATH} already exists.' })
const Group = mongoose.model('Group',groupSchema)

export default Group