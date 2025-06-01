import { supabaseClient } from './mainClient'

export interface IGoogleUserData {
    id: string
    email: string
    user_metadata: {
        avatar_url: string
        email: string
        full_name: string // often from Google
        name: string // sometimes instead of full_name
    }
}

/**
 * Used to check if Google User exists
 * @returns 
 */

export async function getGoogleUserData():Promise<IGoogleUserData | null> {
    const {
        data: { user },
    } = await supabaseClient.auth.getUser();


    if(user) {
        return {
            email : user.email!,
            id : user.id,
            user_metadata : {
                avatar_url : user.user_metadata.avatar_url,
                email :  user.user_metadata.email,
                full_name : user.user_metadata.full_name,
                name : user.user_metadata.name
            }
        }
    }else{
        return null;
    }



}
