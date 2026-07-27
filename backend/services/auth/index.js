import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/db.js"
dotenv.config()

const PORT=process.env.PORT
const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:"Hello from auth"})
})
app.listen(PORT,()=>{
    console.log(`auth started at ${PORT}`)
    connectdb()
})