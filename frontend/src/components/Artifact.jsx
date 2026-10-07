import React, { useState } from 'react'
import { Check, Copy, FileCode2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function Artifact() {
  const messages = useSelector((state) => state.message.messages)
  const [selectedFileIndex, setSelectedFileIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const latestArtifactMessage = [...messages].reverse().find((message) =>
    message.artifacts?.some((artifact) => artifact.files?.length > 0)
  )
  const files = latestArtifactMessage?.artifacts?.flatMap((artifact) => artifact.files) || []
  const selectedFile = files[selectedFileIndex] || files[0]

  const copyFile = async () => {
    if (!selectedFile) return
    try {
      await navigator.clipboard.writeText(selectedFile.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy artifact:', error)
    }
  }

  return (
    <aside className='hidden lg:flex h-full w-[min(38vw,480px)] min-w-[320px] flex-col overflow-hidden border-l border-white/[0.06] bg-[#0d0f14]'>
      <header className='flex h-14 shrink-0 items-center justify-between border-b border-white/[0.06] px-4'>
        <div className='flex items-center gap-2 text-sm font-medium text-slate-200'>
          <FileCode2 size={16} className='text-emerald-400' />
          <span>Artifact</span>
        </div>
        {selectedFile && (
          <button
            type='button'
            onClick={copyFile}
            title={copied ? 'Copied' : 'Copy file'}
            aria-label={copied ? 'Copied file contents' : 'Copy file contents'}
            className='flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-white/[0.06] hover:text-white'
          >
            {copied ? <Check size={15} className='text-emerald-400' /> : <Copy size={15} />}
          </button>
        )}
      </header>

      {files.length > 0 ? (
        <>
          <nav className='flex shrink-0 gap-1 overflow-x-auto border-b border-white/[0.06] px-2 py-2 [scrollbar-width:none]'>
            {files.map((file, index) => (
              <button
                key={`${file.name}-${index}`}
                type='button'
                onClick={() => { setSelectedFileIndex(index); setCopied(false) }}
                aria-pressed={(files[selectedFileIndex] || files[0]) === file}
                className={`max-w-48 shrink-0 truncate rounded-md px-2.5 py-1.5 text-xs ${
                  (files[selectedFileIndex] || files[0]) === file
                    ? 'bg-white/[0.08] text-white'
                    : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300'
                }`}
              >
                {file.name}
              </button>
            ))}
          </nav>
          <div className='min-h-0 flex-1 overflow-auto'>
            <SyntaxHighlighter
              language={selectedFile.name.split('.').pop()}
              style={oneDark}
              showLineNumbers
              wrapLongLines
              customStyle={{ margin: 0, minHeight: '100%', padding: '16px', background: '#0d1117', fontSize: '12px', lineHeight: '1.6' }}
            >
              {selectedFile.content}
            </SyntaxHighlighter>
          </div>
        </>
      ) : (
        <div className='flex flex-1 items-center justify-center px-6 text-center text-sm text-slate-600'>
          Generated code will appear here.
        </div>
      )}
    </aside>
  )
}
