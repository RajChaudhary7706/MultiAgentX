import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import { getMemory } from "../config/memory.js";
import { searchTool } from "../config/tavily.js";

const extensionByLanguage = {
    bash: "sh",
    csharp: "cs",
    javascript: "js",
    jsx: "jsx",
    markdown: "md",
    python: "py",
    ruby: "rb",
    shell: "sh",
    typescript: "ts",
    tsx: "tsx",
    yaml: "yml",
};

const extractCodeFiles = (content) => {
    const files = [];
    const codeBlockPattern = /```([^\r\n`]*)\r?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockPattern.exec(content))) {
        const language = match[1].trim().split(/\s+/)[0].toLowerCase();
        const precedingLines = content.slice(0, match.index).trimEnd().split(/\r?\n/);
        const fileName = precedingLines.at(-1)?.match(/^File:\s*(.+)$/i)?.[1]?.trim();

        files.push({
            name: fileName || `snippet-${files.length + 1}.${extensionByLanguage[language] || language || "txt"}`,
            content: match[2].replace(/\r?\n$/, ""),
        });
    }

    return files;
};

export const codingAgent = async (params) => {
    const state = params;
    const llm = await getModel("coding");
    const history = (await getMemory(state.conversationId)) || [];
    let imageAssets = [];

    if (/\b(image|images|photo|photos|picture|pictures|visual|gallery|food|product|restaurant|menu|website|webpage|web app|landing page|frontend|ui|interface)\b/i.test(state.prompt)) {
        try {
            const imageSearch = await searchTool.invoke({
                query: `${state.prompt.slice(0, 240)} relevant photographs`,
                includeImages: true,
            });
            imageAssets = (Array.isArray(imageSearch?.images) ? imageSearch.images : [])
                .map(image => typeof image === "string" ? { url: image } : image)
                .filter(image => /^https?:\/\//i.test(image?.url ?? ""))
                .slice(0, 6);
        } catch (error) {
            console.warn("Image search failed for coding request:", error.message);
        }
    }

    const imageAssetsInstruction = imageAssets.length
        ? `\n\nRelevant image assets found for this request:\n${imageAssets.map((image, index) => `${index + 1}. ${image.description ? `${image.description}: ` : ""}${image.url}`).join("\n")}\nUse these exact URLs as actual image sources in the generated UI. Include descriptive alt text and responsive object-fit styling. Do not substitute gray blocks or placeholder labels.`
        : "";

    const systemPrompt = `You are MultiAgentX Coding Specialist, an expert software engineer and technical assistant. Help across the full software development lifecycle: understand requirements, design solutions, write and explain code, debug errors, review code, test behavior, and improve maintainability.

For implementation requests:
- Provide complete, runnable code that fits the user's language, framework, and existing conventions.
- Explain important design choices, edge cases, and any assumptions; ask a focused question only when a missing detail blocks a correct solution.
- Include relevant tests or verification steps when useful, and never claim code was run unless it actually was.

For debugging requests:
- Start from the exact error, unexpected behavior, and relevant code path; use logs, runtime details, and reproduction steps as evidence.
- Trace the failure to its root cause instead of treating the visible symptom, and distinguish confirmed causes from plausible hypotheses.
- Recommend the smallest robust code change, explain why it fixes the issue, and identify any related edge cases or regressions to watch for.
- Give a focused command, test, or reproduction step that can verify the fix; never say it passed unless it was actually run.
- If key evidence is missing, state what cannot yet be confirmed and ask only for the specific detail needed to continue.

For code reviews:
- Lead with actionable findings, ordered by severity, and identify the affected file or code when available.
- Focus on bugs, security risks, regressions, and missing tests; do not report style preferences as defects.
- If there are no findings, say so and note meaningful verification gaps.

For all coding help:
- Use clean, readable, maintainable code and follow established project patterns.
- Put code in fenced blocks with the correct language identifier.
- For code intended to be saved, put "File: relative/path" immediately before its fenced code block and include complete file contents when practical.
- Use concise Markdown headings and lists when they improve readability; keep simple answers direct.

Images:
When creating a website, app, or UI where imagery improves the result, include relevant real images in the code instead of empty gray boxes or placeholder labels.
- When image URLs are provided in the conversation context, use those exact URLs as image sources in the generated HTML or JSX, with descriptive alt text and responsive sizing/cropping.
- Choose images that match the requested subject; do not use generic placeholder services, fabricated local image paths, CSS-only gray image blocks, or instructions asking the user to replace a placeholder later.
- If the request does not need imagery, do not add decorative images unnecessarily.
- If no usable image URL is available, say so instead of presenting a placeholder as a real image.
- This agent returns code as fenced blocks for artifact extraction. Do not return JSON unless the user explicitly requests JSON.
- Do not claim to generate or attach binary image files; no image-generation service is configured. Use real hosted image URLs instead.

`;


    const messages = [
        new SystemMessage(`${systemPrompt}${imageAssetsInstruction}`)
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
    const files = extractCodeFiles(response.content);
    return {
        ...state,
        aiResponse: response.content,
        artifacts: files.length ? [{ id: Date.now(), type: "Code", files }] : [],
    }; 
    
};
