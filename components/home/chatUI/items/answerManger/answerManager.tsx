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
        <div className="p-8 space-y-12">
            <div className="space-y-6 ">
                <div className="text-2xl font-bold flex items-center text-neutral-500 border border-neutral-500 p-3 ">Possible diseases</div>
                <h2 className="text-xl">{currentGivenAnswer}</h2>
            </div>
            <div className="space-y-6">
                <div className=" text-2xl flex items-center  text-neutral-500 border border-neutral-500 p-3 ">Recommendations:</div>
                <h2 className="text-xl">{diseaseRecommendation}</h2>
            </div>
        </div>
    )
}
