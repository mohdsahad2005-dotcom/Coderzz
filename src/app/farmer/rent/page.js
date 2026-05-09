'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, IndianRupee } from 'lucide-react'
import { getEquipments, addBooking } from '../../../utils/storage'

export default function RentMachinesPage() {
  const router = useRouter()
  const [equipments, setEquipments] = useState([])

  useEffect(() => {
    setEquipments(getEquipments())
  }, [])

  const handleBook = (eq) => {
    addBooking({ equipmentId: eq.id, equipmentName: eq.name, price: eq.price, status: 'Confirmed' })
    alert(`Successfully booked ${eq.name}!`)
    router.push('/farmer')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white p-4 py-5 shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.push('/farmer')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Available Machines</h1>
      </div>

      <div className="p-5 space-y-5">
        
        {/* Heatmap/Map Mock */}
        <div className="w-full h-32 bg-gray-200 rounded-2xl overflow-hidden relative flex items-center justify-center bg-[url('https://maps.wikimedia.org/osm-intl/12/2932/1454.png')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-primary/20">
            <div className="relative z-10 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm text-sm font-semibold flex items-center gap-2">
                <MapPin className="text-primary w-4 h-4"/> Exploring Belagavi Region
            </div>
        </div>

        <h2 className="font-semibold text-gray-600 text-sm uppercase tracking-wider pt-2">Near You</h2>

        {equipments.map((eq) => (
          <div key={eq.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-secondary/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">{eq.type === 'tractor' ? '🚜' : '🌾'}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-charcoal">{eq.name}</h3>
                <p className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1" /> {eq.location}
                </p>
                <div className="text-primary font-bold mt-2 flex items-center">
                  <IndianRupee className="w-4 h-4" /> {eq.price} <span className="text-gray-400 font-normal text-xs ml-1">/ hour</span>
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-50" />
            <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Owner: <strong>{eq.owner}</strong></p>
                <button 
                  onClick={() => handleBook(eq)}
                  className="bg-primary text-white text-sm font-semibold py-2 px-5 rounded-lg hover:bg-[#153428] transition-colors"
                >
                  Book Now
                </button>
            </div>
          </div>
        ))}
        {equipments.length === 0 && <p className="text-center text-gray-500 py-10">No equipments available right now.</p>}
      </div>
    </div>
  )
}
