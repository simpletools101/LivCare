import Link from "next/link";


type SideMenuItemProps = {
    link:string;
    children:React.ReactNode
    content:string;
}

export default function SideMenuItem({link,children,content}:SideMenuItemProps) {
    return (
        <Link href={link} className="flex  h-[50px] items-center p-5 hover:bg-neutral-700  active:bg-neutral-600 space-x-5  rounded-2xl">
            <div className="icon-container">
                {children}
            </div>
            <span>{content}</span>
        </Link>
    )
}