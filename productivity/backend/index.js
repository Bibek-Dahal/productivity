import express from 'express'
import auth from './routes/auth.js';
import connectDb from './config/database.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import profile from './routes/profile.js'
import group from './routes/group.js'
import path from 'path'
const base_dir = process.cwd()
export default base_dir
dotenv.config()

const app = express()
// app.use(express.json());
//parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


const port = 8000;
const uri = 'mongodb://localhost:27017' 
const options = {
    "dbName":"productivity",
}

connectDb(uri,options)
// app.set('views', path.join(process.cwd(), 'views'));
// app.set('view engine', 'ejs');
/*
    middlewares
*/
app.use('/api',auth) //handle auth routes
app.use('/api/profile',profile) //handles profie routes
app.use('/api/group',group) //handle group routes



app.listen(port,()=>{
    console.log(`listening on port:${port}`)
})



