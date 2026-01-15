import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000'
        const apiKey = process.env.API_KEY

        const searchParams = request.nextUrl.searchParams
        const startDate = searchParams.get('start_date')
        const endDate = searchParams.get('end_date')

        const params = new URLSearchParams()
        if (startDate) params.append('start_date', startDate)
        if (endDate) params.append('end_date', endDate)

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (apiKey) {
            headers['X-API-KEY'] = apiKey
        }

        const queryString = params.toString()
        const url = queryString 
            ? `${apiUrl}/bets/hitrate?${queryString}`
            : `${apiUrl}/bets/hitrate`

        const res = await fetch(url, {
            cache: 'no-store',
            headers
        })

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch hit rate stats' }, { status: res.status })
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Hit rate API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

