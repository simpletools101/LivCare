"use client"

import LxButton from '@/components/common/lx-button'
import ProductLogo from '@/components/common/product-logo'
import ThemeButton from '@/components/common/theme-btn'
import UserAccountItem from '@/components/common/user-account'
import { AlignJustify, History, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HistoryDialogComponent, IHistoryData } from '../history/history-dialog'
import { getDataFromExistingStorage } from '../history/storage/storage'
import { Button } from '@/components/ui/button'

export default function Titlebar() {
    const [currrentData, setCurrentData] = useState<IHistoryData[]>([])


    useEffect(() => {
        /**
         * Retrieve Data from storage bucket
         */

        let currentHistoryDataFromStorageBucket = getDataFromExistingStorage()
        setCurrentData(currentHistoryDataFromStorageBucket)
    }, [setCurrentData])

    return (
        <div className="h-[60px] flex justify-between items-center" suppressHydrationWarning>
            <div className="flex items-center space-x-5 ml-4">
                <ProductLogo />
            </div>
            <div className="mr-6 flex  items-center space-x-5">
                <HistoryDialogComponent data={currrentData}>
                    <button  className="cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded-2xl  p-3">
                        <History/>
                    </button>
                </HistoryDialogComponent>
                <ThemeButton/>
            </div>
        </div>
    )
}
