'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, IndianRupee, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUser } from '../../../utils/storage'

export default function EarningsPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getUser())
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white p-4 py-5 shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.push('/owner')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Earnings Report</h1>
      </div>

      <div className="p-6">
        <div className="bg-[#1A1A1A] rounded-3xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
            <h2 className="text-sm font-medium text-gray-400 mb-1">Total Amount Earned</h2>
            <div className="text-4xl font-bold mb-2 flex items-center text-green-400">
                <IndianRupee className="w-8 h-8 mr-1 " /> {user?.amountEarned || 0}
            </div>
            <p className="text-xs text-gray-500 mt-4 flex items-center">
               <TrendingUp className="w-3 h-3 mr-1 text-green-400"/> +12% from last month
            </p>
        </div>

        <h3 className="font-bold text-lg mb-4 text-charcoal">Recent Payouts</h3>
        <div className="space-y-4">
            {[
                {id: 1, date: '10 May 2026', desc: 'Ramu booked Harvester', amt: 1500},
                {id: 2, date: '02 May 2026', desc: 'Suresh booked Tractor', amt: 3000},
            ].map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">{item.desc}</h4>
                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                    </div>
                    <span className="text-green-600 font-bold flex items-center text-sm"><IndianRupee className="w-3 h-3 mr-0.5"/>{item.amt}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}
