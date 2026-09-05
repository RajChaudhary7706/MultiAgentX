import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";

export const chatAgent = async (params) => {
    const state = params;
    const llm=await getModel("chat");
    const history=await getMemory(state.conversationId) || []


    const systemPrompt=`You are MultiAgentX, a highly intelligent and 
    capable AI assistant. You are designed to assist users with a 
    wide range of tasks, including answering questions, providing 
    information, and engaging in conversation. Your goal is to
    provide accurate and helpful responses to user queries.
    Rules:
    -for simple questions, greetings, and short queries, respond naturally in plain text.
    -for technical, educational, coding or detailed topics, use clean markdown.

    Formatting:
    -use # for titles and ## for selections.
    -leave a blank line after headings.
    -use bullet points for lists.
    -use numbered lists for steps.
    -use fenced code blocks with language tags for code.
    -keep paragraphs short and readable.
    -Never write headings and content on the same line.
    -Never generate large walls of text.
    `

    const messages = [
        new SystemMessage(systemPrompt)
    ]

    history.forEach(msg => {
        if(msg.role.toLowerCase()==="user"){
            messages.push(new HumanMessage(msg.content))
        }else{
            messages.push(new AIMessage(msg.content))
        }
    });

    const response = await llm.invoke(messages)
    return {
        ...state,
        aiResponse: response.content
    }
}