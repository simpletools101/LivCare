import { supabaseClient } from '../../auth/mainClient'

export interface userDatabaseAddIn {
    user_metadata: any
    id: string
    user_id: string
    google_id: string
    name: string
    email: string
}

type AddUserPT = 'didAddUser' | 'error'

/**
 * 
 * Used to add User to the database
 * 
 * @param mainData 
 * @returns 
 */

export async function addUserInDatabase(mainData: userDatabaseAddIn): Promise<AddUserPT> {
    const { error: insertError } = await supabaseClient.from('users').insert([
        {
            google_id: mainData.google_id,
            user_id: mainData.user_id, // optional if using auth.uid()
            email: mainData.email,
            name: mainData.name,
        },
    ])

    if (insertError) {
        console.log(insertError.details,insertError.message)
        return "error"
    } else {
        return 'didAddUser'
    }
}
