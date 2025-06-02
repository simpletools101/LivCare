/**
 * The redirect URL for the google Authentication
 */


//Dev Google URL

export const devGoogleURL = "http://localhost:3000/dashboard";


//production Google URL

export const prodGoogleURL = "https://liv-care.vercel.app/dashboard";

/**
 * The Redirect Link for production or development
 */

export const _redirectLink = process.env.NODE_ENV == "development" ? devGoogleURL : prodGoogleURL;


export const _redirectLink2 = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://liv-care.vercel.app"