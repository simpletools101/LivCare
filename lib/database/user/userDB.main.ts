import { addUserInDatabase, userDatabaseAddIn } from "./addUserInDB";
import { isUserInDatabase } from "./isUserInDB";

export class UserDB {


    /**
     * Add User to Database based on their data from ******Google*****
     * @param data 
     * @returns 
     */
    public  addUserToDatabase(data:userDatabaseAddIn) {
        return addUserInDatabase(data)
    }

    /**
     * Check if user exists based on their email
     * @param email 
     * @returns 
     */
    public  isUserAvailable(email:string) {
        return isUserInDatabase(email)
    }

}