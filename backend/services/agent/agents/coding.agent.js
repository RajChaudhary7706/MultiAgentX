import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const codingAgent = async (params) => {
    const state = params;
    const llm = await getModel("coding");
    const history = (await getMemory(state.conversationId)) || [];

    const systemPrompt = `You are MultiAgentX Coding Specialist, an expert software engineer and technical assistant.
Your goal is to provide clean, efficient, robust, and well-explained code and technical solutions.

Rules:
- Provide clean, readable, production-grade code with best practices.
- ALWAYS use fenced code blocks with specific language identifiers (e.g. \`\`\`javascript, \`\`\`python, \`\`\`typescript, \`\`\`jsx, \`\`\`html, \`\`\`css, \`\`\`sql).
- Include brief, clear explanations highlighting key logic, design patterns, and edge cases.
- Use proper markdown headings (# for main title, ## for sections, ### for subsections).
- If fixing a bug or debugging, concisely explain what caused the issue and why your fix works.
- For short questions or code reviews, be concise, direct, and helpful.`;

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