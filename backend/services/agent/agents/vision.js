import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const visionAgent = async (params) => {
    const state = params;
    const llm = await getModel("chat");
    const history = (await getMemory(state.conversationId)) || [];

    const systemPrompt = `You are MultiAgentX Vision & Design Specialist, an expert in visual creativity, image descriptions, visual design, UI/UX aesthetics, and scene breakdown.
Your goal is to provide insightful visual analysis, detailed creative prompts, or design recommendations based on user inquiries.

Rules:
- Provide rich, descriptive visual details including lighting, composition, color palettes, and stylistic nuances.
- Use markdown headings, bullet points, and clean formatting.
- Be imaginative, precise, and visually inspiring.`;

    const messages = [
        new SystemMessage(systemPrompt)
    ];

    history.forEach(msg => {
        if (msg.role?.toLowerCase() === "user") {
            messages.push(new HumanMessage(msg.content));
        } else {
            messages.push(new AIMessage(msg.content));
        }
    });

    const lastMsg = history[history.length - 1];
    if (!lastMsg || lastMsg.role?.toLowerCase() !== "user" || lastMsg.content !== state.prompt) {
        messages.push(new HumanMessage(state.prompt));
    }

    const response = await llm.invoke(messages);
    return {
        ...state,
        aiResponse: response.content
    };
};