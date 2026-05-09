'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Gift, Award } from 'lucide-react'
import { getUser } from '../../../utils/storage'
import { useEffect, useState } from 'react'

export default function RewardsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white p-4 py-5 shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.push('/farmer')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">E-Rewards & Credits</h1>
      </div>

      <div className="p-6">
        <div className="bg-gradient-to-br from-primary to-[#153428] rounded-3xl p-6 text-white text-center shadow-lg mb-8 relative overflow-hidden">
            <Gift className="absolute -top-4 -right-4 w-32 h-32 text-white/10" />
            <h2 className="text-sm font-medium text-secondary mb-1">Your Current Balance</h2>
            <div className="text-5xl font-bold mb-2">{user?.credits || 0}<span className="text-xl ml-1">CR</span></div>
            <p className="text-xs text-gray-300">Credits can be used to get discounts on machine rentals.</p>
        </div>

        <h3 className="font-bold text-lg mb-4">How to earn credits?</h3>
        <div className="space-y-3">
            {[
                {title: 'Refer a Farmer', points: '+50 CR'},
                {title: 'Complete 5 Bookings', points: '+100 CR'},
                {title: 'Return Equipment Early', points: '+20 CR'},
            ].map(item => (
                <div key={item.title} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-secondary/40 p-2 rounded-lg text-primary"><Award className="w-5 h-5"/></div>
                        <span className="font-semibold text-gray-700">{item.title}</span>
                    </div>
                    <span className="text-green-600 font-bold">{item.points}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
