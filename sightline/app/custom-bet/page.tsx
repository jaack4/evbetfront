import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { hasActiveSubscription } from '@/lib/subscription'
import { DashboardNavbar } from "../../components/DashboardNavbar"

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function CustomBet() {
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

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white/20">
            <DashboardNavbar />

            <main className="relative z-10 pt-24 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold text-white mb-1">Custom Bet</h1>
                        <p className="text-sm text-zinc-500">
                            Build your own custom betting analysis
                        </p>
                    </div>

                    {/* Coming Soon Placeholder */}
                    <div className="bg-zinc-900/30 border border-white/5 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6">
                            <span className="text-3xl">🔧</span>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                        <p className="text-zinc-400 max-w-md">
                            Custom bet analysis tools are currently in development. 
                            Check back soon for more updates.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

