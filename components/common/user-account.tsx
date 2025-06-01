'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/lib/auth/logout'
import { useRouter } from 'next/navigation'

interface UserAccountItemProps {
    img_url: string
    user_name: string
}

export default function UserAccountItem(props: UserAccountItemProps) {
    const router = useRouter()

    const onWillLogoOut = () => {
        logout().then(() => {
            router.push('/')
        })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center p-3">
                    <Avatar className=" w-[40px] h-[40px] cursor-pointer">
                        <AvatarImage src={props.img_url} />
                        <AvatarFallback>Liv</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-neutral-950">
                <DropdownMenuLabel className="cursor-default p-2">
                    <div className="flex w-full items-center">
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={props.img_url} />
                            <AvatarFallback>Liv</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">{props.user_name}</div>
                        <p></p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer" onClick={onWillLogoOut}>
                        Logo out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
