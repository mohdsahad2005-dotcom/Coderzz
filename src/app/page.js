'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()
  const [language, setLanguage] = useState('English')

  const handleContinue = (type) => {
    // Optionally set state before pushing
    router.push(`/auth?type=${type}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-charcoal">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-primary/10 overflow-hidden text-center p-8 space-y-6">
        
        {/* Brand Icon or Logo placeholder */}
        <div className="mx-auto w-24 h-24 bg-secondary rounded-full flex items-center justify-center shadow-inner">
          <Globe className="text-primary w-12 h-12" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Agro-Sathi</h1>
          <p className="text-gray-500 text-sm">Empowering Every Farmer, Optimizing Every Machine</p>
        </div>

        {/* Language Selection */}
        <div className="space-y-3 mt-8">
          <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Select Language</label>
          <div className="flex gap-2 justify-center">
            {['English', 'ಕನ್ನಡ', 'हिंदी'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  language === lang
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-8 space-y-4">
          <button 
            onClick={() => handleContinue('login')}
            className="w-full relative group bg-primary hover:bg-[#153428] text-white py-3.5 px-6 rounded-2xl font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center"
          >
            <span>Login to Account</span>
            <ArrowRight className="w-5 h-5 absolute right-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => handleContinue('register')}
            className="w-full bg-secondary/50 hover:bg-secondary text-primary py-3.5 px-6 rounded-2xl font-semibold transition-all shadow-sm border border-secondary active:scale-95"
          >
            Register New Account
          </button>
        </div>
        
      </div>
    </div>
  )
}
