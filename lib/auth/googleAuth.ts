import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options : {
            redirectTo  : "/dashboard",
        }
    })

    if (error) {
        console.error('OAuth sign-in error:', error.message)
        return
    }

    // Supabase will handle the redirect. After redirect, fetch user session like this:
    // (You typically do this in a useEffect or API route on the landing page)
}

export const getUserProfile = async () => {
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error) {
        console.error('Error fetching user:', error.message)
        return null
    }

    if (user) {
        const { user_metadata } = user
        const name = user_metadata.full_name || user_metadata.name
        const avatar = user_metadata.avatar_url || user_metadata.picture

        console.log('Name:', name)
        console.log('Image URL:', avatar)

        return { name, avatar }
    }

    return null
}
