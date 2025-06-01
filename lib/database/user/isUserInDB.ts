import { supabaseClient } from '../../auth/mainClient'

/**
 * We are going to check if the user exists depending on the available email
 * @param email
 * @returns
 */

export async function isUserInDatabase(email: string): Promise<'isAvailable' | 'isUnknown' | 'isError'
> {
    const { data: existingUser, error } = await supabaseClient.from('users').select('*').eq('email', email).single()

    if (error && error.code !== 'PGRST116') {
        console.error('Error checking user:', error.message)
        return 'isError'
    }

    if (existingUser) {
        return 'isAvailable'
    } else {
        return 'isUnknown'
    }
}
