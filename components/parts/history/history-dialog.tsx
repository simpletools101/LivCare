'use client'

import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import HistoryItem from './history-item'
import { useEffect } from 'react'
import { intializeStorageBucket } from './storage/storage'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface IHistoryData {
    query: string
    possibleDisease: string
    possibleSolution: string
    id:string;
}

type HistoryDialogComponentProps = {
    data: IHistoryData[]
    children: React.ReactNode
}

export function HistoryDialogComponent(props: HistoryDialogComponentProps) {
    useEffect(() => {
        intializeStorageBucket()
    })

    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">History</DialogTitle>
                    <DialogDescription>All the Queries that are made are cached here.</DialogDescription>
                </DialogHeader>
                <Accordion suppressHydrationWarning type="single" collapsible className="w-full">
                    <ScrollArea className='w-full h-72'>
                        {props.data.map((item) => {
                            return (
                                <HistoryItem
                                    key={item.id}
                                    query={item.query}
                                    possibleDisease={item.possibleDisease}
                                    possibleSolution={item.possibleSolution}
                                />
                            )
                        })}
                    </ScrollArea>
                </Accordion>
            </DialogContent>
        </Dialog>
    )
}
