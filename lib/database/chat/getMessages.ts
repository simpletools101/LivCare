// fetchMessages.ts

import { supabaseClient } from "@/lib/auth/mainClient"


export async function getUserMessages(userId: string) {
  const { data, error } = await supabaseClient
    .from('messages')
    .select('message_id, created_at, responses(*)')
    .eq('user_id', userId)

  if (error) {
    console.error('❌ Error fetching messages:', error)
    return []
  }

  return data || []
}
