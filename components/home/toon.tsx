import { Snail } from "lucide-react";

type ToonProps = {
    size:number
}

export default function Toon({size = 40}:ToonProps) {
 
  return (
    <div className="rounded-3xl h-[80px] flex text-4xl bg-[#ffff0e] text-black  justify-center items-center w-[100px] border">
        <Snail size={size} />
    </div>
  );
}
