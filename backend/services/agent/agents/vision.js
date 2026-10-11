import { getModel } from "../config/llmModels.js"
import axios from "axios"

export const visionAgent=async (state)=>{
    const llm=await getModel("image")
    const res=await llm.invoke(`
        You are an elite AI image prompt engineer.
        Convert the user request into a highly detailed image generation prompt.
        Requirements:
        -Cinematic
        -Professional
        -High detail
        -Sharp focus
        -8k quality
        -Photorealistic
        -Depth of field
        -Professional photography
        -Stunning visula

        Return only the image prompt.
        User Request:
        ${state.prompt}
        
        `)
        const prompt=res.content.trim()
        const imageUrl=`https://image.pollination.ai/prompt/${encodeURIComponent(prompt)}`
        const imageRes = await axios.get(imageUrl,{responseType:"arraybuffer"})
}