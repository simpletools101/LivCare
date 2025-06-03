
import { _redirectLink } from "../authURL";
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

    let  googleUserData:"didSignIn" | "failed" | "unknown" = "unknown"


    /**
     * Sign up with google
     */
    const {data,error} = await supabaseClient.auth.signInWithOAuth({
        provider : "google",
        options : {
            redirectTo : _redirectLink,
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