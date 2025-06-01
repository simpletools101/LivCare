import { signupWithGoogle } from "./initalGoogleAuth";
import { getGoogleUserData } from "./userDataGoogleAuth";

export class GoogleOAuth {


    /**
     * Used to Start the SignUp Process
     * @returns 
     */
    public async intializeSignInSequence(){
        return signupWithGoogle()
    }


    /**
     * Used to get user if he/she exits 
     * @returns 
     */
    public async onDidSignUpGoogleUser() {
        return getGoogleUserData();
    }

}

