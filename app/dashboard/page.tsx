'use client'

import BaseHome from '@/components/home/base'
import Titlebar from '@/components/parts/titlebar/titlebar'
import { useState } from 'react'

export default function DashBoardContainer() {
    const [currentData, setCurrentData] = useState()
    const [currentUserImage, setUserImage] = useState('')
    const [currentUserName, setUserName] = useState('')

    return (
        <div className="flex flex-col  h-screen  w-full">
            <header className=" ">
                <Titlebar
                    currentData={currentData}
                    currentUserImage={currentUserImage}
                    currentUserName={currentUserName}
                />
            </header>
            <div className="flex flex-1  w-full">
                <div className="main-content flex-1 h-full">
                    <BaseHome sendUserImage={setUserImage} sendUserName={setUserName} sendDataUp={setCurrentData} />
                </div>
            </div>
        </div>
    )
}
