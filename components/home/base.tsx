'use client'

import { useState } from 'react'
import MessageContainer from './messageContainer/messageContainer'
import WelcomeUI from './welcome/welcome'

export default function BaseHome() {

    const [isWelcomeUIVisible, setWelcomeUIVisible] = useState(true)

    /**
     * Used to hide the welcome UI when the chatUI shows up
     */
    function hideWelcomeUI() {
        setWelcomeUIVisible(false)
    }

    /**
     * USed to Show the welcome UI when the ChatUI is hidden.
     */

    function showWelcomeUI() {
        setWelcomeUIVisible(true)
    }

    return (
        <div className="h-full relative  w-full">
            <WelcomeUI willHideWelcome={isWelcomeUIVisible} />
            <div className="w-full flex items-end justify-center h-fit">
                <div className="w-[60%] max-[465px]:w-[80%] max-[390px]:w-[90%]">
                    <MessageContainer
                        requestHidingOfWelcomeUI={hideWelcomeUI}
                        requestShowingOfWelcomeUI={showWelcomeUI}
                    />
                </div>
            </div>
        </div>
    )
}
