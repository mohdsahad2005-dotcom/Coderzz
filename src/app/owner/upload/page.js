'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera, UploadCloud, MapPin, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getUser, addEquipment } from '../../../utils/storage'

export default function UploadVehiclePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({
      name: '', type: 'tractor', price: '', location: ''
  })

  useEffect(() => {
    setUser(getUser())
  }, [])

  const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)
      setTimeout(() => {
          addEquipment({
              ...form,
              price: Number(form.price),
              owner: user?.name.split(' ')[0] || 'Owner',
              status: 'available',
              image: '/images/tractor.png'
          })
          alert('Vehicle uploaded successfully!')
          router.push('/owner')
      }, 1000)
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="bg-white p-4 py-5 shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.push('/owner')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Upload Vehicle</h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Placeholder */}
            <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Vehicle Image</label>
                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Camera className="w-8 h-8 mb-2 text-primary/50" />
                    <span className="text-sm font-medium">Click to upload photo</span>
                </div>
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Vehicle Name Model</label>
                <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. Mahindra 575 DI" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-primary focus:border-primary outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Type</label>
                    <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none">
                        <option value="tractor">Tractor</option>
                        <option value="harvester">Harvester</option>
                        <option value="tiller">Tiller</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Price (per hour)</label>
                    <input required type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="₹" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-primary focus:border-primary outline-none" />
                </div>
            </div>

            <div>
                <label className="text-sm font-semibold text-gray-700 mb-1 block">Location</label>
                <div className="flex relative">
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input required type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="e.g. Belagavi, Karnataka" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:ring-primary focus:border-primary outline-none" />
                </div>
            </div>

            <button disabled={loading} type="submit" className="w-full mt-4 bg-primary text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-[#153428] transition-all flex justify-center items-center gap-2">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UploadCloud className="w-5 h-5" />}
                {loading ? 'Uploading...' : 'List Vehicle'}
            </button>
        </form>
      </div>
    </div>
  )
}
