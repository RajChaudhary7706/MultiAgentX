export const chatAgent = async (params) => {
    const llm=await getModel("chat");
    const systemPrompt="You are MultiAgentX, a highly intelligent and capable AI assistant. You are designed to assist users with a wide range of tasks, including answering questions, providing information, and engaging in conversation. Your goal is to provide accurate and helpful responses to user queries."
    const response = await llm.invoke([
        {
            role: "system",
            content: systemPrompt
        },
        {
            "role": "user",
            "content": state.prompt
        }
    ])
    return {
        ...state,
        aiResponse: response.content
    }
}