
import { supabaseClient } from "./mainClient";

type UserData = {
    google_id: string
    name: string
    email: string
    avatar_url: string // from Google profile, not saved in DB
}
/**
 * Sign up with google
 */

export async function signupWithGoogle() {
 
    let redirectLink = process.env.NEXT_FORMAT_DEV ? "http://localhost:3000/dashboard" : "https://liv-care-.vercel.app/dashboard"

    let  googleUserData:"didSignIn" | "failed" | "unknown" = "unknown"

    /**
     * Sign up with google
     */
    const {data,error} = await supabaseClient.auth.signInWithOAuth({
        provider : "google",
        options : {
            redirectTo : redirectLink
        }
    })

    if(error) {
        console.log("Error Signinng In With Google User")
        googleUserData = "failed"
    }else{
        googleUserData  = "didSignIn"
        console.log("signed --------in")
    }

    return googleUserData;

}