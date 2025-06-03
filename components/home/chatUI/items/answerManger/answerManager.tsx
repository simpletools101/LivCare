type AnswerManagerProps = {
    currentGivenAnswer: string
    diseaseRecommendation: string
}

export default function AnswerManager({ currentGivenAnswer, diseaseRecommendation }: AnswerManagerProps) {
    return (
        <div className="flex flex-col h-full overflow-y-auto px-4 py-5 space-y-8">
            <section className="space-y-2">
                <div className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                    🦠 <span className="font-light text-sm">Possible Diseases</span>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-neutral-800 dark:text-neutral-200 break-words">
                    {currentGivenAnswer}
                </p>
            </section>

            <section className="space-y-2">
                <div className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                    💊 <span className="font-light text-sm">Recommended Solution</span>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-neutral-800 dark:text-neutral-200 break-words">
                    {diseaseRecommendation}
                </p>
            </section>
        </div>
    )
}
