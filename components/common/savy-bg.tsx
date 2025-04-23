import productImage from '../../assets/android-chrome-512x512.png'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function SavyBackground() {
    const [hideSplash, setHideSplash] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setHideSplash(true)
        }, 1300)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div
            className={`space-y-6 bg-neutral-100  flex items-center justify-center flex-col fixed dark:bg-neutral-900 border-yellow-300 border-t-8 w-full h-full top-0 z-50 transition-transform duration-700 ease-in-out ${
                hideSplash ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
            <Image src={productImage} className="rounded-md" alt="Product Image" width={150} height={150} />
            <span className="text-3xl font-bold">LivCare</span>
            <p className='dark:text-neutral-700 text-neutral-500'>Loading Isolated Bundles...</p>
        </div>
    )
}
