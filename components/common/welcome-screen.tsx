import Image from 'next/image'
import GoogleImage from  "@/assets/google-icon-logo-svgrepo-com.svg"
import Toon from '../home/toon'

export default function WelcomeScreen() {
    return (
        <div className=' h-screen flex flex-col items-center  justify-between w-full relative'>
            <div className='ml-32  p-24 flex flex-col space-y-12 mt-8   max-[1033px]:ml-4 max-[1033px]:p-12 max-[605px]:p-6 max-[374px]:ml-2 max-[374px]:p-8 '>
                <div className="flex  flex-col space-x-8 ">
                    <Toon size={45} />
                    <h2 className='font-bold text-4xl mt-4 max-[493px]:text-3xl'>
                        LivCare <span className=''>– Your AI Cow Health Assistant</span>
                    </h2>
                </div>
                <div className='w-[90%] font-light text-2xl text-neutral-600 max-[416px]:text-xl'>
                    🖐 Hey there, Farmer! Noticed something off with your cow? Don't worry—LivCare is here to help!
                </div>
                <span className='cursor-pointer text-yellow-300 font-light underline underline-offset-4'>Get Started</span>
            </div>
       
        </div>
    )
}
