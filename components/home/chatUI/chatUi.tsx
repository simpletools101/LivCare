'use client'

import { FastForward, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import UserQuestionTitle from './items/user-question-title'
import ProgressLoader from './items/progress-loader'
import OptionsCT from './items/optionsCT/optionsCt'
import AnswerManager from './items/answerManger/answerManager'

type ChatUIProps = {
    chatUIHideFunc: () => void
    isChatUiVisible: boolean
    currentUserMessage: string
}

export default function ChatUI({ chatUIHideFunc, isChatUiVisible, currentUserMessage }: ChatUIProps) {
    /**
     *
     * Answer and Recommendation Area
     */

    type AnswerRecommendation = {
        aiAnswer: string
        aiRecommendation: string
    }

    const [currentAnswerRecommendation, setAnswerRecommendation] = useState<AnswerRecommendation>({
        aiAnswer: '',
        aiRecommendation: '',
    })

    const [isAnswerAreaVisible, setAnswerAreaVisible] = useState(true)

    function showAnswerArea() {
        setAnswerAreaVisible(true)
    }
    function hideAnswerArea() {
        setAnswerAreaVisible(false)
    }

    /**
     * ---------------------------------------------------------------------------------------------------------
     * CURRENT AI QUERY MANAGER
     * =========================================================================================================
     */

    const [currentQuery, setCurrentQuery] = useState('')

    /**
     * --=========================================================
     * Fetch function
     * ============================================================
     */

    const handleRequest = async () => {
        const res = await fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userRequestContent: currentQuery }),
        })

        const data = await res.json()
        setAnswerRecommendation(data)
    }

    /**
     * Diagnosiing Loader
     */
    const [isLoaderVisible, setLoaderVisible] = useState(false)

    /**
     * show the current loader
     */
    function showDiagnosingLoader() {
        setLoaderVisible(true)
    }

    /**
     * Hide the current loadr
     */
    function hideDiagnosingLoader() {
        setLoaderVisible(false)
    }

    /**
     * OptionsCT
     */
    const [isOptionsCTVisible, setOptionsCTVisible] = useState(false)

    /**
     * Close the optionsCT item
     */
    function closeOptionsCTItem() {
        setOptionsCTVisible(false)
    }
    /**
     * Show the optionsCT item(Called the AI optional)
     */
    function showOptionsCTItem() {
        setOptionsCTVisible(true)
    }

    /**
     * get the current Selected Options from the user
     */

    function generatedUserOptions(options: string[]) {
        console.log('selected-options', options)
        closeOptionsCTItem()
    }

    function ___spinRoutine() {
        hideAnswerArea()
        showDiagnosingLoader()
        handleRequest().then(() => {
            hideDiagnosingLoader()
            showAnswerArea()
        })
    }

    useEffect(() => {
        /**
         * The current User message from the AI Input Box
         */
        setCurrentQuery(currentUserMessage)

        /**
         * Send the Ai request everytime the current user input changes
         */
        //should show the diagnosing item

        ;((s: string) => {
            if (currentUserMessage.trim() === '') return
            ___spinRoutine()
        })('Daddy Dot get me a slime')
    }, [currentUserMessage])

    return (
        <div
            style={{
                display: isChatUiVisible ? 'block' : 'none',
            }}
            className="border-t border-t-yellow-300 transition-all h-[490px] w-full relative   mb-2 border "
        >
            <button
                title="Close the Chat"
                onClick={chatUIHideFunc}
                className="icon-container p-2 rounded-3xl ml-3 cursor-pointer absolute right-4 top-1 flex items-center justify-center hover:bg-neutral-800"
            >
                <X />
            </button>
            <main className="mt-8 block h-[90%]  relative overflow-x-hidden">
                <div className="main-content  h-full overflow-hidden">
                    <UserQuestionTitle currentQuestion={currentUserMessage} />
                    <div
                        style={{
                            display: isLoaderVisible ? 'block' : 'none',
                        }}
                        className=" absolute w-full bottom-0 h-full flex items-center overflow-hidden"
                    >
                        <ProgressLoader />
                    </div>
                    <div
                        style={{
                            display: isOptionsCTVisible ? 'block' : 'none',
                        }}
                    >
                        <OptionsCT
                            requestUIClosure={closeOptionsCTItem}
                            AIFollowUpQuestion="Did You see these as well?"
                            getCurrentSelectedUserOptions={generatedUserOptions}
                            possibleOptions={['food', 'life', 'hate', 'gh']}
                        />
                    </div>
                    <div
                        style={{
                            display: isAnswerAreaVisible ? 'block' : 'none',
                        }}
                    >
                        <AnswerManager />
                    </div>
                </div>
                <div className="btn-content-area"></div>
            </main>
        </div>
    )
}
