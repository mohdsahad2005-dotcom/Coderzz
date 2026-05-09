'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IndianRupee, Users, UploadCloud, UserCircle, LogOut, Package } from 'lucide-react'
import { getUser, getEquipments } from '../../utils/storage'

export default function OwnerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [myEquipments, setMyEquipments] = useState([])

  useEffect(() => {
    const u = getUser()
    if (!u || u.role !== 'owner') router.push('/')
    else {
      setUser(u)
      const all = getEquipments()
      setMyEquipments(all.filter(e => e.owner.includes(u.name.split(' ')[0])))
    }
  }, [router])

  if (!user) return <div className="min-h-screen bg-background p-6">Loading...</div>

  const menuOptions = [
    { name: 'Amount Earned', icon: IndianRupee, path: '/owner/earnings', color: 'bg-green-100 text-green-700' },
    { name: 'Community Updates', icon: Users, path: '/farmer/community', color: 'bg-blue-100 text-blue-700' },
    { name: 'Upload Vehicle', icon: UploadCloud, path: '/owner/upload', color: 'bg-purple-100 text-purple-700' },
  ]

  const logout = () => {
    localStorage.removeItem('agro_sathi_user')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white p-6 rounded-b-[2.5rem] shadow-md pb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
            <p className="text-gray-400 text-sm flex items-center mt-1">
              Owner Dashboard <UserCircle className="w-4 h-4 ml-1 inline" />
            </p>
          </div>
          <button onClick={logout} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Total Earned</p>
            <h2 className="text-2xl font-bold text-green-600 flex items-center"><IndianRupee className="w-5 h-5"/> {user.amountEarned}</h2>
          </div>
          <div className="text-right border-l pl-4 border-gray-100">
            <p className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Listed</p>
            <h2 className="text-xl font-bold text-gray-800 flex justify-end items-center">{myEquipments.length} <Package className="w-4 h-4 ml-1"/></h2>
          </div>
        </div>
      </div>

      <div className="p-6 mt-4">
        <h3 className="text-lg font-bold text-charcoal mb-4">Manage Space</h3>
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
        
        <div className="mt-8">
            <h3 className="text-lg font-bold text-charcoal mb-4">Your Past Rentals</h3>
            <div className="space-y-3">
                {myEquipments.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center bg-gray-50 py-6 rounded-xl border border-dashed border-gray-200">No vehicles listed yet. Upload one to start earning!</p>
                ) : (
                    myEquipments.map(eq => (
                        <div key={eq.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between border border-gray-100">
                            <div>
                                <h4 className="font-bold">{eq.name}</h4>
                                <p className="text-xs text-gray-500">{eq.location}</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full font-semibold">Active</span>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  )
}
