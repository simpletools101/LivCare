'use client'

import LvLogo from "@/components/common/lv-logo"

type WelcomeUIProps = {
  willHideWelcome: boolean
}

export default function WelcomeUI({ willHideWelcome }: WelcomeUIProps) {
  if (!willHideWelcome) return null

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12">
      <div className="mt-6 flex flex-col items-center justify-center w-full max-w-3xl px-2 sm:px-4">
        <LvLogo />

        <h2 className="mt-4 text-center text-2xl sm:text-3xl md:text-4xl font-semibold">
          Hey there! Got a cow in trouble? Tell me what's up...
        </h2>

        <p className="mt-4 sm:mt-6 text-center text-neutral-500 text-base sm:text-lg md:text-xl font-light">
          "Describe the symptoms, and I'll help you figure out what's wrong."
        </p>
      </div>
    </div>
  )
}
