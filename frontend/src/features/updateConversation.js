import api from "../utils/axios"

export const updateConverstion=async(payload)=>{
    try{
        const {data} =await api.post("/api/chat/update-conversation",payload)
        return data
    }catch(error){
        console.log(error)
        return []
    }
}