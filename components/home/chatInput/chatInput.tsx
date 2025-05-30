'use client'

import { useRef, useEffect, useState, KeyboardEvent } from 'react'
import { ArrowBigUp, ArrowUp, Send } from 'lucide-react'

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
    const textareaRef = useRef(null)
    const [message, setMessage] = useState('')

    function sendRequestForChatUIVisiblity() {
        if (!isChatUIVisible) {
            requestChatUIVisiblity()
        }
    }

    const handleInput = () => {
        const textarea = textareaRef.current! as HTMLElement
        if (textarea) {
            textarea.style.height = 'auto' // Reset height
            textarea.style.height = `${textarea.scrollHeight}px` // Adjust height dynamically
        }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault() // Prevents a new line
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
        setMessage('') // Clear the input
        handleInput() // Reset the textarea height
    }


    useEffect(() => {

        handleInput() // Ensure correct height on first render
    }, [])

    return (
        <div className="flex items-end rounded-2xl border bg-neutral-100 p-2 dark:bg-neutral-900">
            <textarea
                ref={textareaRef}
                onInput={handleInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                placeholder="Type Symptom here.."
                rows={1}
                className="bg-neutral-100 dark:bg-neutral-900 ml-4 flex max-h-[200px] min-h-[40px] flex-1 resize-none overflow-y-auto  outline-none transition-[height] duration-150 ease-in-out p-2 text-base leading-[1.4]"
            ></textarea>
            <div
                onClick={sendMessageFromMessageBtn}
                className="mr-2 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-xl bg-[#ffff0e] text-black"
            >
                <ArrowUp />
            </div>
        </div>
    )
}
