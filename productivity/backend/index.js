import express from 'express'
import auth from './routes/auth.js';
import connectDb from './config/database.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import profile from './routes/profile.js'
import group from './routes/group.js'
import {Server} from 'socket.io'
import cors  from "cors";
import Chat from './models/Chat.js';
const base_dir = process.cwd()
export default base_dir
dotenv.config()
let users = []


//socket io conf
const io = new Server({
    cors: {
        // origin: ["http://127.0.0.1:3000","http://localhost:3000"],
        origin:"*"
        // credentials: true
  }
})

const app = express()
// app.use(express.json());
//parse application/json
app.use(bodyParser.json())

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


const port = 8000;
const uri = 'mongodb://localhost:27017' 
const options = {
    "dbName":"productivity",
}

connectDb(uri,options)

/*
    middlewares
*/
app.use('/api',auth) //handle auth routes
app.use('/api/profile',profile) //handles profie routes
app.use('/api/group',group) //handle group routes



const server = app.listen(port,()=>{
    console.log(`listening on port:${port}`)
})

//listen for websocket
io.listen(server)

io.on('connection',(socket)=>{
    console.log('new web socket connection added')
    socket.on('new-user',(data)=>{
        users.push(socket.id)
        console.log(users)
        socket.join(`${data.roomId}`)
        
    })

    socket.on('disconnect', () => {
        
        let filtered = users.filter(function(value, index, arr){ 
            return value == socket.id;
        });
        users.splice(filtered[0],1)
        console.log('remaining users',users)
    });

    socket.on('new-chat-message',async (data)=>{
        const {room,message,userId} = data
        try{
            const chat = await Chat.create({
                group: room,
                user: userId,
                text: message,
            })

            const populated_chat = await chat.populate('user')
            console.log(populated_chat)
        

            // console.log('username',chat.user.username)

            io.in(room).emit("new-chat-message",{user:populated_chat.user.username,message:message})
            console.log('chat message created')
        }catch(error){
            console.log(error)
            console.log('message cannot be created')
        }
        
    })

});


