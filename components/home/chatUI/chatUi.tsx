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
    let executionCount = 0

    const showAnswerArea = () => setAnswerAreaVisible(true)
    const hideAnswerArea = () => setAnswerAreaVisible(false)
    const showDiagnosingLoader = () => setLoaderVisible(true)
    const hideDiagnosingLoader = () => setLoaderVisible(false)

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

    if (!isChatUiVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
            <div className="w-full max-w-2xl h-[90vh] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800 shadow-xl relative border border-neutral-200 dark:border-neutral-700">
                <button
                    onClick={chatUIHideFunc}
                    title="Close"
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <main className="mt-14 h-full relative overflow-hidden">
                    <div className="main-content px-4 sm:px-6 h-full overflow-hidden">
                        <h1 className="text-neutral-700 dark:text-yellow-300 font-semibold text-base sm:text-lg mb-3 break-words">
                            {currentUserRequestMessage}
                        </h1>

                        {isLoaderVisible && (
                            <div className="absolute w-full bottom-0 h-full flex items-center justify-center bg-white/80 dark:bg-black/60">
                                <ProgressLoader />
                            </div>
                        )}

                        {isAnswerAreaVisible && (
                            <div className="mt-3 relative">
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
}
