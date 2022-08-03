import express from "express";
import dotenv from 'dotenv';
dotenv.config()
const app = express()

const PORT = process.env.PORT || 8000
app.listen(()=>{`listening on port ${PORT}`})