'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tractor, Gift, Users, Youtube, UserCircle, LogOut } from 'lucide-react'
import { getUser } from '../../utils/storage'

export default function FarmerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = getUser()
    if (!u || u.role !== 'farmer') router.push('/')
    else setUser(u)
  }, [router])

  if (!user) return <div className="min-h-screen bg-background p-6">Loading...</div>

  const menuOptions = [
    { name: 'Machines for Rent', icon: Tractor, path: '/farmer/rent', color: 'bg-green-100 text-green-700' },
    { name: 'E-Rewards & Credits', icon: Gift, path: '/farmer/rewards', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Community Updates', icon: Users, path: '/farmer/community', color: 'bg-blue-100 text-blue-700' },
    { name: 'Training (Videos)', icon: Youtube, path: '/farmer/training', color: 'bg-red-100 text-red-700' },
  ]

  const logout = () => {
    localStorage.removeItem('agro_sathi_user')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-6 rounded-b-[2.5rem] shadow-md shadow-primary/20 pb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
            <p className="text-secondary text-sm flex items-center mt-1">
              Your Dashboard <UserCircle className="w-4 h-4 ml-1 inline" />
            </p>
          </div>
          <button onClick={logout} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Stats Card inserted pushing down over the edge */}
      </div>

      <div className="px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Total Credits</p>
            <h2 className="text-2xl font-bold text-gray-800">{user.credits} CR</h2>
          </div>
          <div className="text-right border-l pl-4 border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Bookings</p>
            <h2 className="text-xl font-bold text-gray-800">2</h2>
          </div>
        </div>
      </div>

      <div className="p-6 mt-4">
        <h3 className="text-lg font-bold text-charcoal mb-4">What would you like to do?</h3>
        <div className="grid grid-cols-2 gap-4">
          {menuOptions.map((opt) => {
            const Icon = opt.icon
            return (
              <button 
                key={opt.name}
                onClick={() => router.push(opt.path)}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-all text-left flex flex-col items-center gap-3 active:scale-95 group"
              >
                <div className={`p-4 rounded-full ${opt.color} mb-1 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="font-semibold text-sm text-center text-charcoal leading-tight">{opt.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
