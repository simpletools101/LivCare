"use client"

type UserQuestionTitleProps = {
    currentQuestion: string
}

export default function UserQuestionTitle({ currentQuestion }: UserQuestionTitleProps) {
    return (
            <div className=" text-neutral-600 ml-6 w-[850px]   border text-xl font-light  dark:text-[#ffff0e] max-[692px]:text-2xl max-[394px]:text-xl  ">
                <span className="w-1.5">{currentQuestion}</span>
                
            </div>
    )
}

// max-[692px]:text-2xl max-[394px]:text-xl