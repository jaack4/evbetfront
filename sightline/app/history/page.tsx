import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { hasActiveSubscription } from '@/lib/subscription'
import { DashboardNavbar } from "../../components/DashboardNavbar"
import { HistoryContent } from "../../components/HistoryContent"

// Force dynamic rendering to avoid static/ISR build for this page
export const dynamic = 'force-dynamic'

async function getHistoricalBets() {
    try {
        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000'
        const apiKey = process.env.API_KEY

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (apiKey) {
            headers['X-API-KEY'] = apiKey
        }

        const res = await fetch(`${apiUrl}/bets/historical?page=1&page_size=50`, {
            cache: 'no-store',
            headers
        })

        if (!res.ok) {
            return {
                bets: [],
                total_count: 0,
                page: 1,
                page_size: 50,
                total_pages: 0
            }
        }
        return res.json()
    } catch (error) {
        console.error("Historical bets API Error:", error)
        return {
            bets: [],
            total_count: 0,
            page: 1,
            page_size: 50,
            total_pages: 0
        }
    }
}

async function getHitRateStats() {
    try {
        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000'
        const apiKey = process.env.API_KEY

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (apiKey) {
            headers['X-API-KEY'] = apiKey
        }

        const res = await fetch(`${apiUrl}/bets/hitrate`, {
            cache: 'no-store',
            headers
        })

        if (!res.ok) {
            return {
                overall: {
                    category: 'Overall',
                    total_bets: 0,
                    wins: 0,
                    losses: 0,
                    hit_rate: 0
                },
                by_bookmaker: [],
                by_sport: [],
                by_market: []
            }
        }
        return res.json()
    } catch (error) {
        console.error("Hit rate API Error:", error)
        return {
            overall: {
                category: 'Overall',
                total_bets: 0,
                wins: 0,
                losses: 0,
                hit_rate: 0
            },
            by_bookmaker: [],
            by_sport: [],
            by_market: []
        }
    }
}

export default async function History() {
    const { userId } = await auth()

    // Redirect to sign-in if not authenticated
    if (!userId) {
        redirect('/sign-in')
    }

    // Check if user has active subscription
    const hasSubscription = await hasActiveSubscription(userId)

    if (!hasSubscription) {
        redirect('/pricing?subscription_required=true')
    }

    // Fetch data in parallel
    const [historicalBets, hitRateStats] = await Promise.all([
        getHistoricalBets(),
        getHitRateStats()
    ])

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            <DashboardNavbar />

            <main className="relative z-10 pt-24 pb-20 px-4 md:px-8">
                <div className="max-w-[1600px] mx-auto">
                    <HistoryContent 
                        initialBets={historicalBets} 
                        initialStats={hitRateStats} 
                    />
                </div>
            </main>
        </div>
    )
}

