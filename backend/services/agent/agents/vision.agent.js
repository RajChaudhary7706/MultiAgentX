import { getModel } from "../config/llmModels.js"
import axios from "axios"

export const visionAgent=async (state)=>{

    try{
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

        const buffer = Buffer.from(imageRes.data)
        const filename = `image-${data.now()}.png`

        await uploadToS3(filename,buffer,"image/png")
        const downloadUrl = await getFromS3(filename,24*60*60)

        return{
            ...state,
            aiResponse:`
            Image Generated Successfully 
            ![Generated Image](${downloadUrl})
            [Download Image](${downloadUrl})
            Link expires in 10 minutes.
            `
        }

    }catch(error){
                return{
            ...state,
            aiResponse:"Failed to generate image"
        }
    }

}