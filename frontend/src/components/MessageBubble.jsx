import React from 'react'
import ReactMarkdown from "react-markdown";

function MessageBubble({ role, content }) {
    const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[72%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed
        ${
        isUser
          ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
          : "bg-white/[0.04] border border-white/[0.07] text-slate-200 rounded-t1-sm"
        }`}>
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        
      </div>
    </div>
  )
}

export default MessageBubble
