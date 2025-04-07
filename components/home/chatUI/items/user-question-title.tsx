

type UserQuestionTitleProps = {
    currentQuestion:string;
}

export default function UserQuestionTitle({currentQuestion}:UserQuestionTitleProps) {

    return (
        <div className="ml-6 font-bold  flex-col flex justify-center  w-[90%] mt-2">
            <h2 className="text-3xl text-yellow-300">{currentQuestion}.</h2>
        </div>
    )
}