import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.NEXT_PUBLIC_SUPABASE_URL!, // Your Supabase Postgres connection string
})

export interface userDatabaseAddIn {
    user_metadata: any
    id: string
    user_id: string
    google_id: string
    name: string
    email: string
}

type AddUserPT = 'didAddUser' | 'error'

export async function addUserInDatabaseRawSQL(mainData: userDatabaseAddIn): Promise<AddUserPT> {
    const client = await pool.connect()

    try {
        const query = `
      INSERT INTO users (google_id, user_id, email, name)
      VALUES ($1, $2, $3, $4)
    `
        const values = [mainData.google_id, mainData.user_id, mainData.email, mainData.name]

        await client.query(query, values)
        return 'didAddUser'
    } catch (error) {
        console.error('❌ Error inserting user:', error)
        return 'error'
    } finally {
        client.release()
    }
}
