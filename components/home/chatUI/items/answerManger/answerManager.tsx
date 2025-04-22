type AnswerManagerProps = {
    /**
     * The answer that was received from the AI
     */
    currentGivenAnswer: string
    /**
     * The Recommendation from the AI Model
     */
    diseaseRecommendation: string
}

export default function AnswerManager({currentGivenAnswer,diseaseRecommendation}:AnswerManagerProps) {
    return (
        <div className="p-6 space-y-12 h-[300px]">
            <div className="space-y-6 ">
                <div className="w-fit text-xl bg-neutral-50 dark:bg-neutral-900  font-light flex items-center rounded-lg  border  p-2 ">Possible diseases:</div>

                <h2 className="text-xl">{currentGivenAnswer}</h2>
            </div>
            <div className="space-y-6">
                <div className=" text-xl bg-neutral-50 dark:bg-neutral-900 flex items-center font-light rounded-lg   border p-2 w-fit ">Possible Solution:</div>
                <h2 className="text-xl">{diseaseRecommendation}</h2>
            </div>
        </div>
    )
}
