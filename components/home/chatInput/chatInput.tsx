'use client'

import { useRef, useEffect, useState, KeyboardEvent } from 'react'
import { ArrowUp } from 'lucide-react'

type ChatInputProps = {
  isChatUIVisible: boolean
  requestChatUIVisiblity: () => void
  getMessage: (message: string) => void
}

export default function ChatInput({
  getMessage,
  requestChatUIVisiblity,
  isChatUIVisible,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [message, setMessage] = useState('')

  function sendRequestForChatUIVisiblity() {
    if (!isChatUIVisible) {
      requestChatUIVisiblity()
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto' // Reset height
      textarea.style.height = `${textarea.scrollHeight}px` // Adjust height dynamically
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // Prevent new line
      sendMessage()
    }
  }

  const sendMessageFromMessageBtn = () => {
    sendMessage()
  }

  const sendMessage = () => {
    if (message.trim() === '') return // Ignore empty messages
    getMessage(message)
    sendRequestForChatUIVisiblity()
    setMessage('') // Clear input
    handleInput() // Reset textarea height
  }

  useEffect(() => {
    handleInput() // Adjust height on mount
  }, [])

  return (
    <div className="flex items-end rounded-2xl border bg-neutral-100 p-2 dark:bg-neutral-900 max-w-full md:max-w-3xl mx-auto">
      <textarea
        ref={textareaRef}
        onInput={handleInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
        placeholder="Type Symptom here.."
        rows={1}
        className="bg-neutral-100 dark:bg-neutral-900 ml-2 flex-grow max-h-[200px] min-h-[30px] resize-none overflow-y-auto outline-none transition-[height] duration-150 ease-in-out p-2 text-base leading-[1.4] rounded-lg"
      />
      <button
        onClick={sendMessageFromMessageBtn}
        className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ffff0e] text-black transition hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        aria-label="Send message"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
