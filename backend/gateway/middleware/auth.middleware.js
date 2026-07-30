import { json } from "express"
// import redis from "../../shared/redis/redis.js"
const protect=async (req,res,next)=>{
    try{
        const sessionId=req.cookies?.session
        if(!sessionId){
            return res.status(400).josn({message:"Unauthorized"})
        }
        const session = await redis.get(`session-${sessionId}`)
        if(!session){
            return res.status(400).josn({message:"session expired"})
        }
        req.user=JSON.parse(session)
        next();
    }
    catch(error){
        return res.status(500).josn({message:`Protect Error ${error}`})
    }
}

export default protect