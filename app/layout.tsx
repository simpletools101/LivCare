import type { Metadata } from 'next'
import Titlebar from '@/components/parts/titlebar/titlebar'
import local from 'next/font/local'
import './globals.css'
import SideMenu from '@/components/parts/sideMenu/sideMenu'
import { useTheme } from '@/hooks/useTheme'
import DOM from '@/pagei/_document'
import { ThemeProvider } from '@/components/common/theme-provider'
import { Toaster } from '@/components/ui/sonner'

/**
 * Bringing in font families
 */

const LexendFont = local({
    src: './fonts/Lexend.ttf',
    preload: true,
    variable: '--lexend-font',
})

const AbrilFatFace = local({
    src: './fonts/AbrilFatface.ttf',
    preload: true,
    variable: '--abril-fontface',
})

export const metadata: Metadata = {
    title: 'LivCare',
    description: 'Predict Cattle Diseases in realtime',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${LexendFont.className} antialiased`}>
                <div className="main-container flex flex-col h-screen w-full dark:bg-neutral-950 bg-white ">
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                    </ThemeProvider>
                </div>
                <Toaster/>
            </body>
        </html>
    )
}
