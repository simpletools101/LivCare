import { supabaseClient } from "./mainClient";



export const logout = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    console.log('User signed out successfully');
  }
};