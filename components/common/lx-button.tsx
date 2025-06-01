"use client"

type LxButtonProps = {
    children:React.ReactNode
    onClickFunc:()=>void;
}


export default function LxButton({children,onClickFunc}:LxButtonProps) {
    return (
        <div onClick={onClickFunc} className="cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded-2xl  p-2">
            {children}
        </div>
    )
}