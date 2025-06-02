


'use client'

import { createContext, use, useEffect, useState } from 'react'
import MessageContainer from './messageContainer/messageContainer'
import WelcomeUI from './welcome/welcome'
import SavyBackground from '../common/savy-bg'
import { supabaseClient } from '@/lib/auth/mainClient'
import { UserDB } from '@/lib/database/user/userDB.main'
import { getGoogleUserData } from '@/lib/auth/userDataGoogleAuth'
import { getUserMessages } from '@/lib/database/chat/getMessages'
import { IHistoryData } from '../parts/history/history-dialog'
import { useRouter } from 'next/navigation'
import {_redirectLink2} from "@/lib/authURL"
import { SupabaseClient } from '@supabase/supabase-js'

export const IdContext = createContext<string>('')

interface IBaseHome {
    sendDataUp: (history: any) => void
    sendUserImage: (img_url: string) => void
    sendUserName: (name_i: string) => void
}

export default function BaseHome(props: IBaseHome) {
    const router = useRouter()

    const [currentGoogleUserID, setCurrentGoogleUserID] = useState('')

    const [isWelcomeUIVisible, setWelcomeUIVisible] = useState(true)
    /**
     * Used to hide the welcome UI when the chatUI shows up
     */
    function hideWelcomeUI() {
        setWelcomeUIVisible(false)
    }

    /**
     * USed to Show the welcome UI when the ChatUI is hidden.
     */

    function showWelcomeUI() {
        setWelcomeUIVisible(true)
    }

    useEffect(() => {
        const fetchHistoryBasedOnID = (id: string) => {
            getUserMessages(id).then((data) => {
                if (data) {
                    console.log('Data From Database', data)
                    props.sendDataUp(data)
                }
            })
        }

        const createDatabaseModel = async () => {
            const USER_DB = new UserDB()

            let userData = await getGoogleUserData()
            if (userData) {
                console.log('current-data', userData)
                props.sendUserName(userData.user_metadata.full_name)
                props.sendUserImage(userData.user_metadata.avatar_url)
                let isUserAvailable = await USER_DB.isUserAvailable(userData.email)
                if (isUserAvailable == 'isAvailable') {
                    /**
                     * USER IS AVAILABLE IN THE DATABASE SO WE CONTINUE ANY WAY
                     */
                    setCurrentGoogleUserID(userData.id)
                    fetchHistoryBasedOnID(userData.id)
                } else {
                    let response = await USER_DB.addUserToDatabase({
                        email: userData.email,
                        name: userData.user_metadata.name,
                        user_id: userData.id,
                        google_id: `google${userData.id}`,
                        user_metadata: undefined,
                        id: userData.id,
                    })
                    if (response == 'error') {
                    } else {
                        setCurrentGoogleUserID(userData.id)
                        fetchHistoryBasedOnID(userData.id)
                    }
                }
            }
        }

        /**
         * Check Session
         */
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabaseClient.auth.getSession()

            if (session) {
                console.log(session.user.email)
                createDatabaseModel()
            } else {
                router.push(_redirectLink2)
            }
        }
        /**
         * USed to cleanup URL
         */
        const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                // Store session if needed
                // Clean up the URL (remove the access token from the hash)
                window.history.replaceState({}, document.title, `${_redirectLink2}/dashboard`)
            }
        })

        checkSession()
        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [currentGoogleUserID])

    return (
        <div className="h-full relative  w-full">
            <SavyBackground />
            <WelcomeUI willHideWelcome={isWelcomeUIVisible} />
            <div className="w-full flex items-end justify-center h-fit">
                <div className="w-[70%] max-[688px]:w-[80%] max-[589px]:w-[90%]   max-[465px]:w-[90%] max-[390px]:w-[90%]">
                    <MessageContainer
                        userID={currentGoogleUserID}
                        requestHidingOfWelcomeUI={hideWelcomeUI}
                        requestShowingOfWelcomeUI={showWelcomeUI}
                    />
                </div>
            </div>
        </div>
    )
}
