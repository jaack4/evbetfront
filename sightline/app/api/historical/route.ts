import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000'
        const apiKey = process.env.API_KEY

        const searchParams = request.nextUrl.searchParams
        const page = searchParams.get('page') || '1'
        const pageSize = searchParams.get('page_size') || '50'
        const bookmaker = searchParams.get('bookmaker')
        const sport = searchParams.get('sport')
        const market = searchParams.get('market')
        const win = searchParams.get('win')

        const params = new URLSearchParams({
            page,
            page_size: pageSize,
        })

        if (bookmaker) params.append('bookmaker', bookmaker)
        if (sport) params.append('sport', sport)
        if (market) params.append('market', market)
        if (win !== null && win !== '') params.append('win', win)

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (apiKey) {
            headers['X-API-KEY'] = apiKey
        }

        const res = await fetch(`${apiUrl}/bets/historical?${params.toString()}`, {
            cache: 'no-store',
            headers
        })

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch historical bets' }, { status: res.status })
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Historical bets API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

