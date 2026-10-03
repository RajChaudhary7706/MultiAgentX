import React from 'react'
import ReactMarkdown from "react-markdown";

function MessageBubble({ role, content, images}) {
    const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`w-fit max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl break-words overflow-hidden leading-relaxed
        ${
        isUser
          ? "bg-gradient-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
          : "text-slate-200 rounded-t1-sm"
        }`}>

        {images.length>0 && (
          <div className='flex flex-wrap gap-3 mt-4'>
            {images.map((img,i)=>(
              <img key={i} src={img} alt={`image-${i}`} loading="lazy" onError={(e) =>e.currentTarget.remove()}
              className="w-40 h-28 rounded-xl object-cover boder boder-white/10 cursor-zoom-in hover:opacity-90 transition"
              />
            ))}
          </div>
        )}
            <ReactMarkdown>
                {content}
            </ReactMarkdown>
        
      </div>
    </div>
  )
}

export default MessageBubble
