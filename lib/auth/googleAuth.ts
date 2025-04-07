import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);


export const signInWithGoogle = async ()=>{
    const {error} = await supabase.auth.signInWithOAuth({
        provider : "google"
    })
    if(error) console.error()
}