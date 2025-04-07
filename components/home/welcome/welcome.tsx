'use client'

import Toon from '../toon'
import local from 'next/font/local'

type WelcomeUIProps = {
    willHideWelcome: boolean
    /**
     *
     * @param suggestions
     * @returns
     */
}

export default function WelcomeUI({ willHideWelcome }: WelcomeUIProps) {
    return (
        <div
            style={{
                display: willHideWelcome ? 'flex' : 'none',
            }}
            className="flex-col  items-center p-12 justify-center w-full max-[578px]:p-8"
        >
            <div className=" flex items-center flex-col justify-center w-[80%] max-[792px]:w-[90%]  max-[714px]:w-[100%] ">
                <div className="">
                    <Toon size={40} />
                </div>
                <h2 className="mt-4 text-4xl text-center max-[678px]:text-3xl max-[505px]:text-2xl max-[345px]:text-xl">
                    Hey there! Got a cow in trouble? Tell me what's up...
                </h2>
                <p className="mt-6 font-light text-xl text-center text-neutral-500 max-[455px]:mt-2 max-[428px]:text-[17px]">
                    "Describe the symptoms, and I'll help you figure out what's wrong."
                </p>
            </div>
        </div>
    )
}
