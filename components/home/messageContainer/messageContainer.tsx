'use client'

import { useState } from 'react'
import ChatInput from '../chatInput/chatInput'
import ChatUI from '../chatUI/chatUi'

type MessageContainerProps = {
    requestHidingOfWelcomeUI: () => void
    requestShowingOfWelcomeUI: () => void
}

export default function MessageContainer({
    requestHidingOfWelcomeUI,
    requestShowingOfWelcomeUI,
}: MessageContainerProps) {
    /***
     * UserMessages
     */
    const [userMessage, setUserMessage] = useState<string>('welcome')

    const [isChatUIVisible, setChatUIVisible] = useState(false)

    /**
     * Used to get the current message from the user Input
     * @param message
     */
    function getCurrentUserMessage(message: string) {
        setUserMessage(message)
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
            <ChatUI
                currentUserMessage={userMessage}
                isChatUiVisible={isChatUIVisible}
                chatUIHideFunc={willHideChatUI}
            />
            <div className="w-[90%] absolute bottom-4 max-[389px]:w-[95%]">
                <ChatInput
                    getMessage={getCurrentUserMessage}
                    requestChatUIVisiblity={willShowChatUI}
                    isChatUIVisible={isChatUIVisible}
                />
            </div>
        </div>
    )
}
