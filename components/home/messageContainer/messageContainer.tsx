'use client'

import { useState } from 'react'
import ChatInput from '../chatInput/chatInput'
import ChatUI from '../chatUI/chatUi'
import eventEmitter from '@/lib/eventMitter'

type MessageContainerProps = {
    userID: string
    requestHidingOfWelcomeUI: () => void
    requestShowingOfWelcomeUI: () => void
}

export default function MessageContainer({
    requestHidingOfWelcomeUI,
    requestShowingOfWelcomeUI,
    userID,
}: MessageContainerProps) {
    const [isChatUIVisible, setChatUIVisible] = useState(false)

    /**
     * Used to get the current message from the user Input
     * @param message
     */
    function getCurrentUserMessage(message: string) {
        eventEmitter.emit('userMessage', message)
    }

    /**
     * Available to HideTheChat Ui a command from the ChatUI component
     */
    function willHideChatUI() {
        requestShowingOfWelcomeUI()
        setChatUIVisible(false)
    }

    /**
     * Available to showTheChatUI a command from the chat input box when focused
     */
    function willShowChatUI() {
        requestHidingOfWelcomeUI()
        setChatUIVisible(true)
    }

    return (
        <div className=" flex flex-col items-center ">
            <ChatUI currentUserID={userID} isChatUiVisible={isChatUIVisible} chatUIHideFunc={willHideChatUI} />
            <div className="w-[60%] absolute bottom-4 max-[521px]:w-[80%] -z-0 mb-4 ">
                <ChatInput
                    getMessage={getCurrentUserMessage}
                    requestChatUIVisiblity={willShowChatUI}
                    isChatUIVisible={isChatUIVisible}
                />
               
            </div>
        </div>
    )
}
