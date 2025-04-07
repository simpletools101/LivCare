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

export default function UserAccountItem() {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger>
                <div className="flex items-center p-3">
                    <Avatar className=" w-[40px] h-[40px]" >
                        <AvatarImage 
                        
                            src="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="@shadcn"
                        />
                        <AvatarFallback>KA</AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-neutral-950'>
                <DropdownMenuLabel className="cursor-default p-2">
                    <div className="flex w-full items-center">
                        <Avatar className='cursor-pointer'>
                            <AvatarImage
                                src="https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="@shadcn"
                            />
                            <AvatarFallback>KA</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">Kalema Pius</div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer">Help</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">Logo out</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
