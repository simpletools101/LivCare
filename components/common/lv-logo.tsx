
import Image from "next/image"
import cowImage from "@/assets/sdf.png"

export default function LvLogo() {
    return (
        <div className=" bg-[#ffff0e] rounded-2xl w-[90px] h-[80px] flex justify-center items-center">
            <Image src={cowImage} width={60} height={60} alt="WelcomeImage" />
        </div>
    )
}
