'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageSquare } from 'lucide-react'

export default function CommunityPage() {
  const router = useRouter()

  const updates = [
    { id: 1, author: 'Agriculture Dept', time: '2 hours ago', content: 'Subsidy on new Harvesters extended till end of the month. Visit local panchayat.' },
    { id: 2, author: 'Ramesh (Farmer)', time: '5 hours ago', content: 'Does anyone have a water pump for rent near Hubli?' },
    { id: 3, author: 'Agro-Sathi Team', time: '1 day ago', content: 'We just added 50 new tractors in Dharwad region! Check out the rent section.' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white p-4 py-5 shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Community Updates</h1>
      </div>

      <div className="p-6 space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
             <div className="flex gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-charcoal">{update.author}</h4>
                    <p className="text-xs text-gray-400">{update.time}</p>
                </div>
             </div>
             <p className="text-gray-700 text-sm mt-3 leading-relaxed">{update.content}</p>
          </div>
        ))}
        
        <button className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-xl hover:scale-105 transition-transform">
            <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
