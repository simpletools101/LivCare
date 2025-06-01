'use client'

import LvLogo from './lv-logo'
import { signupWithGoogle } from '@/lib/auth/initalGoogleAuth'
import { supabaseClient } from '@/lib/auth/mainClient'
import { useEffect, useState } from 'react'
import { getGoogleUserData } from '@/lib/auth/userDataGoogleAuth'
import { useRouter } from 'next/navigation'
import IndeterminateCircularProgress from './progresst'
import Spinner from './progresst'

export default function WelcomeScreen() {
    const [userName, setUserName] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [willShowGoogleButton, setShowGoogleButton] = useState(false)
    const router = useRouter()

    async function isUserLoggedIn(): Promise<boolean> {
        const {
            data: { session },
        } = await supabaseClient.auth.getSession()
        return !!session
    }

    const intialize = async () => {
        const loggedIn = await isUserLoggedIn()
        if (loggedIn) {
            const userData = await getGoogleUserData()
            setUserName(userData!.user_metadata.full_name)
            setLoading(false)

        } else {
            setShowGoogleButton(true)
        }
    }

    const handleGoogleLogin = async () => {
        await signupWithGoogle()
    }

    useEffect(() => {
        intialize()
    }, [setLoading])

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-4xl mx-auto flex flex-col space-y-10">
                <div className="flex flex-col items-start space-y-6">
                    <LvLogo />
                    <h2 className="text-4xl font-light max-sm:text-3xl max-[400px]:text-2xl">
                        LivCare <span>– Your AI Cow Health Assistant</span>
                    </h2>
                    <p className="text-2xl font-light text-neutral-600 max-sm:text-xl max-[400px]:text-base">
                        🖐 Hey there, Farmer! Noticed something off with your cow? Don’t worry — LivCare has got your
                        back!
                    </p>
                </div>

                {!willShowGoogleButton && (
                    <>
                        <Spinner isVisible={isLoading} />
                        <h3
                            style={{
                                display: isLoading ? 'none' : 'block',
                            }}
                            className="text-2xl mt-0 font-bold max-sm:text-xl"
                        >
                            Welcome back, <span className="text-yellow-300">{userName}</span>
                        </h3>
                        <button
                            style={{
                                display: isLoading ? 'none' : 'block',
                            }}
                            onClick={() => router.push('/dashboard')}
                            className="px-6 py-2 text-yellow-300 border border-yellow-300 rounded-md transition hover:bg-yellow-300 hover:text-white w-fit"
                        >
                            Let's Continue...
                        </button>
                    </>
                )}

                {willShowGoogleButton && (
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center space-x-3 px-6 py-2 bg-yellow-300 text-black border border-yellow-300 rounded-md hover:bg-transparent hover:text-white transition w-fit"
                    >
                        <GoogleIcon />
                        <span>Sign in with Google</span>
                    </button>
                )}
            </div>
        </div>
    )
}

function GoogleIcon() {
    return (
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
         c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4
         C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
        C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            />
            <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238
        C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            />
        </svg>
    )
}
