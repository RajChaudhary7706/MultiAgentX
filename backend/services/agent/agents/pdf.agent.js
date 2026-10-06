import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const pdfAgent = async (params) => {
    const state = params;
    const llm = await getModel("chat");
    const history = (await getMemory(state.conversationId)) || [];

    const systemPrompt = `You are MultiAgentX Document Specialist, an expert in document structuring, PDF content analysis, synthesis, and report writing.
Your goal is to provide well-organized, comprehensive summaries, formatted reports, and document outlines.

Rules:
- Structure content logically with executive summary, key sections, and actionable takeaways.
- Use clear markdown formatting (tables, bullet points, headers).
- Be accurate, concise, and professional.`;

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