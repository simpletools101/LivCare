"use client"

import BaseHome from '@/components/home/base'
import Titlebar from '@/components/parts/titlebar/titlebar'

export default function DashBoardContainer() {
    return (
        <div className="flex flex-col  h-screen  w-full">
            <header className=" ">
                <Titlebar />
            </header>
            <div className="flex flex-1  w-full">

                <div className="main-content flex-1 h-full">
                    <BaseHome />
                </div>
            </div>
        </div>
    )
}
