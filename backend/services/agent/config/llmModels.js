import { ChatOpenAI } from "@langchain/openai";
import { StateGraph } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/chat-google-generative-ai";
import "dotenv/config";

const openAI = new ChatOpenAI({
    modelName: "gpt-4o-mini",
});

const geminiAI = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

export const getModel = (agent)=>{
    switch(agent){
        case "chat":
            return openAI;
        case "search":
            return geminiAI;
        case "coding":
            return openAI;
        default:
            return openAI;
    }
}