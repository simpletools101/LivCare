
import "./styles/progress-loader.css"

export default function ProgressLoader() {
    return (
        <div className=" h-full flex items-center flex-col justify-center">
            <h2 className="mb-2 text-lg text-yellow-300">Diagnoising...</h2>
            <div className="progress-bar">
                <div className="progress-bar-value"></div>
            </div>
        </div>
    )
}
