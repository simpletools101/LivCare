import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type HistoryItemProps = {
    query: string
    possibleDisease: string
    possibleSolution: string
}

export default function HistoryItem(props: HistoryItemProps) {
    return (
        <AccordionItem value="item-1">
            <AccordionTrigger className='text-lg font-semibold'>{props.query}</AccordionTrigger>
            <AccordionContent className='space-y-4 text-md text-neutral-500'>
                <div><span className='font-semibold'>Possible Disease:  </span>{props.possibleDisease}</div>
                <div><span className='font-semibold'>Possible Solution:  </span>{props.possibleSolution}</div>
            </AccordionContent>
        </AccordionItem>
    )
}
