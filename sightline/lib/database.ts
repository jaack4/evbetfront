import { Pool } from 'pg'

// Initialize the PostgreSQL client with Railway connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params || [])
    return { rows: result.rows }
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

