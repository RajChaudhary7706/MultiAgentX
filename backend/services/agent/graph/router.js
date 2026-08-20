import { getModel } from "../config/llmModels.js";

export const router = async(state)=>{
    const llmModel = getModel("router");
    const prompt = `
    You are a Router Agent.

    Your job is to analyze the user's query and route it to exactly ONE appropriate agent.

    Available agents:
    1. Chat Agent: Handles general conversation, greetings, and general questions.
    2. Coding Agent: Handles programming, debugging, software development, and technical coding queries.
    3. Vision Agent: Handles image analysis, image generation, and vision-related queries.
    4. PDF Agent: Handles PDF creation, analysis, summarization, or questions about PDFs.
    5. PPT Agent: Handles PowerPoint creation, analysis, or presentation-related queries.
    6. Search Agent: Handles web search, current information, news, and online research.

    User Query:
    "${userQuery}"

    Return ONLY the agent name from this list:
    Chat Agent
    Coding Agent
    Vision Agent
    PDF Agent
    PPT Agent
    Search Agent
    `}