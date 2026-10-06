import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const pptAgent = async (params) => {
    const state = params;
    const llm = await getModel("chat");
    const history = (await getMemory(state.conversationId)) || [];

    const systemPrompt = `You are MultiAgentX Presentation Specialist, an expert in creating compelling, well-structured presentation slide decks.
Your goal is to organize topics into clear, professional presentation outlines and slide-by-slide content.

Rules:
- Structure each slide clearly with Slide Number and Slide Title (e.g. ## Slide 1: Introduction).
- Provide bullet points for key talking points, speaker notes, and recommended visual suggestions.
- Keep content concise, impactful, and audience-focused.
- Use markdown formatting with clean typography and spacing.`;

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
