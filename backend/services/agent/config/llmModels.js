import { ChatOpenAI } from "@langchain/openai";
import { StateGraph } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import "dotenv/config";

const openAI = new ChatOpenAI({
    modelName: "gpt-4o-mini",
});

const geminiAI = process.env.GOOGLE_API_KEY
  ? new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: process.env.GOOGLE_API_KEY,
    })
  : null;

export const getModel = (agent)=>{
    switch(agent){
        case "chat":
            return openAI;
        case "search":
            return geminiAI || openAI;
        case "coding":
            return openAI;
        case "vision":
            return openAI;
        case "image":
            return openAI;
        case "pdf":
            return openAI;
        default:
            return openAI;
    }
}