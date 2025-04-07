/**
 * This is the container for options
 * When the user sends something that needs follow up questions
 * we display this and it query has to be resent back to the the AI
 * for getting the disease and possible recommendatop
 */

import { CheckedState } from '@radix-ui/react-checkbox'
import OptionsCTItem from './optionsCTitem'
import { Button } from '@/components/ui/button'

type OptionsCTProps = {
    /**
     * The follow up question provided by the Inital AI Request
     */
    AIFollowUpQuestion: string

    /**
     * The possible options provided by the AI
     */
    possibleOptions: string[]

    getCurrentSelectedUserOptions: (options: string[]) => void
    requestUIClosure:()=>void;
}

export default function OptionsCT(props: OptionsCTProps) {
    let currentSelectedOptions: string[] = []

    /**
     * Event base function
     */

    function clickCheckEventBase(checkedState: CheckedState, selectedLabel: string) {
        if (checkedState) {
            currentSelectedOptions.push(selectedLabel)
        } else {
            let getCurrentIndex = currentSelectedOptions.indexOf(selectedLabel)
            currentSelectedOptions.splice(getCurrentIndex, 1)
        }
    }

    function __runFunction(){
        props.getCurrentSelectedUserOptions(currentSelectedOptions)
    }

    function __cancelFunction() {
        props.requestUIClosure()
    }

    return (
        <div className='p-6 space-y-8 '>
            <h2 className='text-2xl font-bold text-yellow-300 mb-2 flex items-center'>{props.AIFollowUpQuestion}</h2>
            <div className="options-container">
                {props.possibleOptions.map((item, index) => {
                    return <OptionsCTItem label={item} onCheckedState={clickCheckEventBase} key={index} />
                })}
            </div>
            <div className='space-x-5 flex justify-end  '>
                <Button onClick={__cancelFunction} variant="secondary">Cancel</Button>
                <Button onClick={__runFunction}>Send</Button>

            </div>
        </div>
    )
}
