import axios from "axios"
import { graph } from "../graph/graph.js"
import { addMessage } from "../config/memory.js"
import redis from "../../../shared/redis/redis.js"

export const agent = async (req,res)=>{
    try{
        const {prompt,conversationId,agent} = req.body
        
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`,{content:prompt,conversationId,role:"user"})
        await addMessage(conversationId,"User",prompt)

        const result=await graph.invoke({
            prompt,conversationId,agent
        })
        const response=result.aiResponse
        await addMessage(conversationId,"assistant",response)
        await axios.post(`${process.env.CHAT_SERVICE_URL}/save-message`,{content:response,conversationId,role:"assistant",images:result.images,artifacts:result.artifacts})

        return res.status(200).json({
            answer:result?.aiResponse,
            images:result?.images,
            artifacts:result?.artifacts
        })
    }
    catch(error){
        return res.status(500).json({message:`agent error ${error}`})
    }
}