import express from "express";
import dotenv from 'dotenv';
import connectDb from './config/database.js';
dotenv.config()
const app = express()


const uri = 'mongodb://localhost:27017' 
const options = {
    "dbName":"productivity",
}

//connect Db
connectDb(uri,options)

const PORT = process.env.PORT || 8000
app.listen(()=>{`listening on port ${PORT}`})