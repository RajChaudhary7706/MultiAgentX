import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()

const PORT=process.env.PORT
const app=express()

//middleware
app.use('/auth',proxy(process.env.AUTH_SERVICE_URL));

app.get('/',(req,res)=>{
    res.json({message:"Hello from gateway"})
})
app.listen(PORT,()=>{
    console.log(`Gateway started at ${PORT}`)
})