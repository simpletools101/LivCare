'use client'

import { Moon, Sun } from 'lucide-react'
import LxButton from './lx-button'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeButton() {
    const { setTheme,theme } = useTheme()
    const [mounted, setMounted] = useState(false);
    function toggleTheme(){
        if(theme == 'dark') {
            setTheme("light")
        }else{
            setTheme("dark")

        }
    }

    useEffect(() => {
      setMounted(true); // Ensures theme is available after hydration
    }, []);
  
    if (!mounted) return null

    return <LxButton onClickFunc={toggleTheme}>{theme == 'dark' ? <Sun /> : <Moon />}</LxButton>
}

