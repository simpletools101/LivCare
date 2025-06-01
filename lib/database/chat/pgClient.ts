import { Pool } from 'pg'

export const poolClient = new Pool({
  connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL! // full connection string from Supabase settings
})