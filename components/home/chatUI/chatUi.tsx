'use client'

import { FastForward, MailWarning, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import UserQuestionTitle from './items/user-question-title'
import ProgressLoader from './items/progress-loader'
import OptionsCT from './items/optionsCT/optionsCt'
import AnswerManager from './items/answerManger/answerManager'
import { requestFromAI } from '@/lib/model/openAI'
import eventEmitter from '@/lib/eventMitter'
import { addDataToExistingStorage, intializeStorageBucket } from '@/components/parts/history/storage/storage'
import { toast } from 'sonner'
import {nanoid} from "nanoid"
import './style/mediaQuery.css'

type ChatUIProps = {
    chatUIHideFunc: () => void
    isChatUiVisible: boolean
}

export default function ChatUI({ chatUIHideFunc, isChatUiVisible }: ChatUIProps) {
    /**
     *
     * Answer and Recommendation Area
     */

    type AnswerRecommendation = {
        aiAnswer: string
        aiRecommendation: string
    }

    const [currentAnswerRecommendation, setAnswerRecommendation] = useState<AnswerRecommendation>({
        aiAnswer: '...',
        aiRecommendation: '...',
    })

    const [currentUserRequestMessage, setcurrentUserRequestMessage] = useState(
        'Ssssssssssssssssssssssssssssssssssssssssssssssssssssssdsasaassssassasasassasa'
    )

    const [isAnswerAreaVisible, setAnswerAreaVisible] = useState(true)

    function showAnswerArea() {
        setAnswerAreaVisible(true)
    }
    function hideAnswerArea() {
        setAnswerAreaVisible(false)
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

    let executionCount = 0

    async function ___spinRoutine(userRequest: string) {
        executionCount++
        console.log(`Request #${executionCount}:`, userRequest)

        if (executionCount > 5) {
            console.log('Loop detected: Too many executions!')
            return // Prevent further executions if there's a loop
        }

        setcurrentUserRequestMessage(userRequest)
        hideAnswerArea()
        showDiagnosingLoader()

        requestFromAI(userRequest).then((data) => {
            hideDiagnosingLoader()
            showAnswerArea()
            addDataToExistingStorage({
                id : nanoid(),
                query: userRequest,
                possibleDisease: data!.aiAnswer,
                possibleSolution: data!.aiRecommendation,
            })
            setAnswerRecommendation({ aiAnswer: data!.aiAnswer, aiRecommendation: data!.aiRecommendation })
        })
    }

    useEffect(() => {
        const HandleEventEmitterMessaging = (message: string) => {
            if (navigator.onLine) {
                ___spinRoutine(message)
            } else {
                toast('No Internet Connection!', {
                    description: 'Connect to the internet,And Try Again',
                })
            }
        }

        eventEmitter.on('userMessage', HandleEventEmitterMessaging)

        return () => {
            eventEmitter.off('userMessage', HandleEventEmitterMessaging)
        }
    }, [])

    return (
        <div
            style={{
                display: isChatUiVisible ? 'block' : 'none',
            }}
            className="chat-ui-item border-t z-10 border-t-yellow-300 transition-all w-full relative rounded-xl bg-neutral-100 dark:bg-neutral-800   mb-2 border "
        >
            <button
                title="Close the Chat"
                onClick={chatUIHideFunc}
                className="icon-container p-2 rounded-3xl ml-3 cursor-pointer absolute right-4 top-1 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-800"
            >
                <X />
            </button>
            <main className="mt-8 block h-[90%]  relative overflow-x-hidden">
                <div className="main-content  h-full overflow-hidden">
                    <h1 className="text-neutral-600 dark:text-[#ffff0e] stupid font-bold break-words whitespace-normal ml-6 mr-6 text-lg">
                        {currentUserRequestMessage}
                    </h1>

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
                        {/* <OptionsCT
                            requestUIClosure={closeOptionsCTItem}
                            AIFollowUpQuestion="Did You see these as well?"
                            getCurrentSelectedUserOptions={generatedUserOptions}
                            possibleOptions={['food', 'life', 'hate', 'gh']}
                        /> */}
                    </div>
                    <div
                        className=" max-h-[380px] overflow-y-auto overflow-x-hidden"
                        style={{
                            display: isAnswerAreaVisible ? 'block' : 'none',
                        }}
                    >
                        <AnswerManager
                            currentGivenAnswer={currentAnswerRecommendation.aiAnswer}
                            diseaseRecommendation={currentAnswerRecommendation.aiRecommendation}
                        />
                    </div>
                </div>
                <div className="btn-content-area"></div>
            </main>
        </div>
    )
}
