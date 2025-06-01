
type SpinnerProps  = {
    isVisible:boolean;
}


export default function Spinner(props:SpinnerProps) {



  return (
    <div 
    
        style={{display : props.isVisible ? "block" : "none"}}
    className="w-8 h-8 border-4 border-yellow-400 duration-500 border-t-transparent rounded-full animate-spin"></div>
  )
}