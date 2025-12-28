import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { hasActiveSubscription } from '@/lib/subscription'
import { DashboardNavbar } from "../../components/DashboardNavbar"
import { DashboardContent } from "../../components/DashboardContent"
import { Bet } from "../../components/BetRow"

// Force dynamic rendering to avoid static/ISR build for this page
export const dynamic = 'force-dynamic'

async function getBets() {
    try {
        const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000'
        const apiKey = process.env.API_KEY

        try {
            const headers: HeadersInit = {
                'Content-Type': 'application/json',
            }

            if (apiKey) {
                headers['X-API-KEY'] = apiKey
            }

            const res = await fetch(`${apiUrl}/bets?`, {
                cache: 'no-store',
                headers
            })

            if (!res.ok) return []
            return res.json()
        } catch (e) {
            console.warn("API fetch failed, returning empty list")
            return []
        }
    } catch (error) {
        console.error("API Error:", error)
        return []
    }
}

export default async function Dashboard() {
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

    const bets: Bet[] = await getBets()

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            <DashboardNavbar />

            <main className="relative z-10 pt-24 pb-20 px-4 md:px-8">
                <DashboardContent initialBets={bets} />
            </main>
        </div>
    )
}
