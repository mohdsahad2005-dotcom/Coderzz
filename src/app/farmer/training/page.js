'use client'
import { useRouter } from 'next/navigation'
import { ArrowLeft, PlayCircle } from 'lucide-react'

export default function TrainingPage() {
  const router = useRouter()

  const videos = [
    { id: 1, title: 'How to operate Mahindra 575 efficiently', duration: '12:45', thumb: 'bg-green-200' },
    { id: 2, title: 'Best practices for using Harvesters in wet soil', duration: '08:20', thumb: 'bg-yellow-200' },
    { id: 3, title: 'Basic maintenance of tillers', duration: '15:10', thumb: 'bg-blue-200' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white p-4 py-5 shadow-sm sticky top-0 z-10 flex items-center gap-4">
        <button onClick={() => router.push('/farmer')} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Training Modules</h1>
      </div>

      <div className="p-6 space-y-6">
        {videos.map((vid) => (
          <div key={vid.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all group">
             <div className={`h-32 ${vid.thumb} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">{vid.duration}</span>
             </div>
             <div className="p-4">
                <h4 className="font-bold text-charcoal">{vid.title}</h4>
                <p className="text-xs text-primary mt-2 font-semibold">Watch on YouTube</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
