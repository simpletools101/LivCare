import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";


type OptionsCTItemProps = {
    /**
     * The label of the options item
     */
    label:string;

    onCheckedState : (checkedState:CheckedState,currentLabel:string) => void;
}

export default function OptionsCTItem(props:OptionsCTItemProps) {
    return (
        <div className="flex h-[50px] items-center text-xl">

            <Checkbox  onCheckedChange={(checkedState)=>{
                props.onCheckedState(checkedState,props.label)
            }}/>
            <div className="ml-5">{props.label}</div>
        </div>
    )
}