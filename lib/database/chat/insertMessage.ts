import { supabaseClient } from "@/lib/auth/mainClient"

// types.ts
export interface MessagePayload {
  question: string
  possible_solution: string
  possible_disease: string
}


export async function appendUserMessage(userId: string, newMessages: MessagePayload[]) {
  // Step 1: Create a message record
  const { data: messageInsert, error: messageError } = await supabaseClient
    .from('messages')
    .insert([{ user_id: userId }])
    .select('message_id')

  if (messageError || !messageInsert?.[0]?.message_id) {
    console.error('❌ Error inserting message:', messageError)
    return
  }

  const messageId = messageInsert[0].message_id

  // Step 2: Create the responses linked to the message
  const responses = newMessages.map((msg) => ({
    message_id: messageId,
    question: msg.question,
    possible_solution: msg.possible_solution,
    possible_disease: msg.possible_disease
  }))

  const { error: responseError } = await supabaseClient.from('responses').insert(responses)

  if (responseError) {
    console.error('❌ Error inserting responses:', responseError)
  } else {
    console.log('✅ Message and responses saved.')
  }
}
