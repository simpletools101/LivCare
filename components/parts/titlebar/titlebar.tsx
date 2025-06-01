'use client'

import ProductLogo from '@/components/common/product-logo'
import ThemeButton from '@/components/common/theme-btn'
import UserAccountItem from '@/components/common/user-account'
import { History } from 'lucide-react'
import { useEffect, useState } from 'react'
import { HistoryDialogComponent, IHistoryData } from '../history/history-dialog'

interface ITitlebarProps {
    currentData: any
    currentUserImage: string
    currentUserName: string
}

export default function Titlebar(props: ITitlebarProps) {
    const [currrentData, setCurrentData] = useState<IHistoryData[]>([])

    useEffect(() => {
        if (props.currentData && props.currentData.length > 0) {
            let cleanedAndSortedHistory: IHistoryData[] = props.currentData[0].responses.map((data: any) => ({
                query: data.question,
                possibleDisease: data.possible_disease,
                possibleSolution: data.possible_solution,
                id: data.id,
            }))
            setCurrentData(cleanedAndSortedHistory)
        }
    }, [props.currentData])

    return (
        <div className="h-[60px] flex flex-wrap justify-between items-center px-4 md:px-8" suppressHydrationWarning>
            {/* Left side: Logo */}
            <div className="flex items-center flex-shrink-0">
                <ProductLogo />
            </div>

            {/* Right side: controls */}
            <div className="flex items-center space-x-3 md:space-x-5 flex-shrink-0 mt-2 md:mt-0">
                <HistoryDialogComponent data={currrentData}>
                    <button
                        className="cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-800 rounded-2xl p-1 md:p-3 transition"
                        aria-label="History"
                    >
                        <History className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                </HistoryDialogComponent>


                <UserAccountItem
                 
                    img_url={props.currentUserImage}
                    user_name={props.currentUserName}
                />
            </div>
        </div>
    )
}
