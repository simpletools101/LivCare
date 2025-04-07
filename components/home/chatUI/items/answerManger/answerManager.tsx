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

export default function AnswerManager() {
    return (
        <div className="p-8 space-y-12">
            <div className="space-y-6 ">
                <div className="text-2xl font-bold flex items-center text-neutral-500 border border-neutral-500 p-3 ">Disease:</div>
                <h2 className="text-xl">The cow is suffering from a Heart Break it was dumped</h2>
            </div>
            <div className="space-y-6">
                <div className=" text-2xl flex items-center  text-neutral-500 border border-neutral-500 p-3 ">Recommendation:</div>
                <h2 className="text-xl">it should hit a lot of grass and forget the girl of its life forever</h2>
            </div>
        </div>
    )
}
