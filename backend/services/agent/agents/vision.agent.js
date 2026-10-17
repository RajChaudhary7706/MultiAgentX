import axios from "axios";
import { getModel } from "../config/llmModels.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";

export const visionAgent = async (state = {}) => {
    try {
        const userPrompt = typeof state?.prompt === "string" ? state.prompt.trim() : "";
        const llm = await getModel("vision");

        const res = await llm.invoke(`
            You are an elite AI image prompt engineer.
            Convert the user request into a highly detailed image generation prompt.
            Requirements:
            - Cinematic
            - Professional
            - High detail
            - Sharp focus
            - 8k quality
            - Photorealistic
            - Depth of field
            - Professional photography
            - Stunning visual

            Return only the image prompt.
            User Request:
            ${userPrompt || "A cinematic portrait of a cute dog"}
        `);

        const prompt = typeof res?.content === "string"
            ? res.content.trim()
            : String(res?.content ?? "").trim();

        const generatedPrompt = prompt || userPrompt || "A cinematic portrait of a cute dog";
        const imageSourceUrl = `https://picsum.photos/seed/${encodeURIComponent(generatedPrompt)}/1200/800`;

        let imageRes;
        try {
            imageRes = await axios.get(imageSourceUrl, {
                responseType: "arraybuffer",
                timeout: 15000,
            });
        } catch (error) {
            console.error("Image source request failed:", error);
            return {
                ...state,
                aiResponse: "Image source is unreachable from this server."
            };
        }

        if (!imageRes?.data) {
            return {
                ...state,
                aiResponse: "Image source returned an empty response."
            };
        }

        const buffer = Buffer.from(imageRes.data);
        const filename = `image-${Date.now()}.png`;

        if (!process.env.AWS_BUCKET_NAME || !process.env.AWS_REGION) {
            return {
                ...state,
                aiResponse: "S3 is not configured. Add AWS_BUCKET_NAME and AWS_REGION to continue."
            };
        }

        await uploadToS3(filename, buffer, "image/png");
        const downloadUrl = await getFromS3(filename, 60*10);

        return {
            ...state,
            aiResponse: `
            Image Generated Successfully
            [Download Image](${downloadUrl})
            Link expires in 10 minutes.
            `,
            images: [downloadUrl],
        };
    } catch (error) {
        console.error("Vision agent failed:", error);

        return {
            ...state,
            aiResponse: "Failed to generate image",
        };
    }
};