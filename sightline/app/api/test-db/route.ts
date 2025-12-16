import { NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function GET() {
  try {
    // Check if DATABASE_URL exists
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        success: false, 
        error: 'DATABASE_URL environment variable not set'
      }, { status: 500 })
    }

    // Try to connect and query
    const result = await query('SELECT NOW() as current_time, version() as pg_version')
    
    return NextResponse.json({ 
      success: true, 
      database_time: result.rows[0].current_time,
      postgres_version: result.rows[0].pg_version,
      env_check: {
        has_database_url: !!process.env.DATABASE_URL,
        database_url_length: process.env.DATABASE_URL.length,
        node_env: process.env.NODE_ENV
      }
    })
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      error_code: error.code,
      error_stack: error.stack,
      env_check: {
        has_database_url: !!process.env.DATABASE_URL,
        node_env: process.env.NODE_ENV
      }
    }, { status: 500 })
  }
}

