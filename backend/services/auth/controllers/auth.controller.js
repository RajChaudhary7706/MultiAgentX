import { getAuth } from "firebase-admin/auth"
import { app } from "../config/firebase.js"
export const login = async (req,res)=>{
    try{
        const {token} = req.body
        const decoded=await getAuth(app).verifyIdToken(token)
        let user=await user.findOne({
        firebaseUid:decoded.uid  
        })
        if(!user){
            user=await user.create({
                firebaseUid:decoded.uid,
                name:decoded.name,
                email:decoded.email,
                avatar:decoded.picture
            })
        }
        //for auto login within days 
        const sessionId=crypto.randomUUID()

        res.cookie("session",sessionId,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)
    }
    catch(error){
        return res.status(500).json({message:`login error ${error}`})
    }
}