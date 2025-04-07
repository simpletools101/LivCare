
type LxButtonProps = {
    children:React.ReactNode
}


export default function LxButton({children}:LxButtonProps) {
    return (
        <div className="cursor-pointer hover:bg-neutral-700 rounded-2xl  p-3">
            {children}
        </div>
    )
}