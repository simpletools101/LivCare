'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import ProgressLoader from './items/progress-loader'
import AnswerManager from './items/answerManger/answerManager'
import { requestFromAI } from '@/lib/model/openAI'
import eventEmitter from '@/lib/eventMitter'
import { toast } from 'sonner'
import { appendUserMessage } from '@/lib/database/chat/insertMessage'

type ChatUIProps = {
    chatUIHideFunc: () => void
    isChatUiVisible: boolean
    currentUserID: string
}

export default function ChatUI({ chatUIHideFunc, isChatUiVisible, currentUserID }: ChatUIProps) {
    const [currentAnswerRecommendation, setAnswerRecommendation] = useState({
        aiAnswer: '...',
        aiRecommendation: '...',
    })

    const [currentUserRequestMessage, setcurrentUserRequestMessage] = useState('')

    const [isAnswerAreaVisible, setAnswerAreaVisible] = useState(true)
    const [isLoaderVisible, setLoaderVisible] = useState(false)

    const showAnswerArea = () => setAnswerAreaVisible(true)
    const hideAnswerArea = () => setAnswerAreaVisible(false)

    const showDiagnosingLoader = () => setLoaderVisible(true)
    const hideDiagnosingLoader = () => setLoaderVisible(false)

    let executionCount = 0

    async function ___spinRoutine(userRequest: string) {
        executionCount++
        if (executionCount > 5) return

        setcurrentUserRequestMessage(userRequest)
        hideAnswerArea()
        showDiagnosingLoader()

        const data = await requestFromAI(userRequest)

        hideDiagnosingLoader()
        showAnswerArea()

        appendUserMessage(currentUserID, [
            {
                question: userRequest,
                possible_disease: data!.aiAnswer,
                possible_solution: data!.aiRecommendation,
            },
        ])

        setAnswerRecommendation({
            aiAnswer: data!.aiAnswer,
            aiRecommendation: data!.aiRecommendation,
        })
    }

    //@ts-ignore
    useEffect(() => {
        const handleUserMessage = (message: string) => {
            if (navigator.onLine) {
                ___spinRoutine(message)
            } else {
                toast('No Internet Connection!', {
                    description: 'Connect to the internet, then try again.',
                })
            }
        }
        eventEmitter.on('userMessage', handleUserMessage)
        return () => eventEmitter.off('userMessage', handleUserMessage)
    }, [currentUserID])

    return (
        isChatUiVisible && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
                <div className="chat-ui-item w-full max-w-2xl md:max-w-3xl h-[90vh] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 shadow-lg relative border ">
                    <button
                        title="Close the Chat"
                        onClick={chatUIHideFunc}
                        className="p-2 rounded-full cursor-pointer absolute right-3 top-3 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-700"
                    >
                        <X />
                    </button>

                    <main className="mt-12 h-full relative overflow-hidden">
                        <div className="main-content px-6 h-full overflow-hidden">
                            <h1 className="text-neutral-600 dark:text-[#ffff0e] font-bold break-words whitespace-normal text-lg">
                                {currentUserRequestMessage}
                            </h1>

                            {/* Loader */}
                            {isLoaderVisible && (
                                <div className="absolute w-full bottom-0 h-full flex items-center justify-center bg-white/80 dark:bg-black/60">
                                    <ProgressLoader />
                                </div>
                            )}

                            {/* Answer Area */}
                            {isAnswerAreaVisible && (
                                <div className="max-h-[380px] overflow-y-auto mt-4">
                                    <AnswerManager
                                        currentGivenAnswer={currentAnswerRecommendation.aiAnswer}
                                        diseaseRecommendation={currentAnswerRecommendation.aiRecommendation}
                                    />
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        )
    )
}
