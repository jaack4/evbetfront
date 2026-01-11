import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { hasActiveSubscription } from '@/lib/subscription'

export async function GET() {
    try {
        // Verify authentication
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Verify subscription
        const hasSubscription = await hasActiveSubscription(userId)
        if (!hasSubscription) {
            return NextResponse.json({ error: 'Subscription required' }, { status: 403 })
        }

        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000'
        const apiKey = process.env.API_KEY

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (apiKey) {
            headers['X-API-KEY'] = apiKey
        }

        const res = await fetch(`${apiUrl}/bets?limit=400`, {
            cache: 'no-store',
            headers
        })

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch bets' }, { status: 500 })
        }

        const bets = await res.json()
        return NextResponse.json(bets)
    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

