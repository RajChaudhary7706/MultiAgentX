import React from 'react'

function MessageBubble({ role, content }) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/[0.06] text-slate-200'}`}>
        {content}
      </div>
    </div>
  )
}

export default MessageBubble
