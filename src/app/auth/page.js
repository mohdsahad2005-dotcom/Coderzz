'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tractor, User, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { saveUser } from '../../utils/storage'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('type') || 'login' // login or register
  
  const [role, setRole] = useState('farmer') // 'farmer' or 'owner'
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState(1) // 1: Phone, 2: OTP

  const handleSendOTP = (e) => {
    e.preventDefault()
    if (phone.length >= 10) setStep(2)
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    if (otp.length === 4) {
      // Mock user login
      const user = {
        id: Date.now(),
        role: role,
        phone: phone,
        name: role === 'farmer' ? 'Ramu (Farmer)' : 'Suresh (Owner)',
        credits: 120,
        amountEarned: role === 'owner' ? 4500 : 0
      }
      saveUser(user)
      if (role === 'farmer') router.push('/farmer')
      else router.push('/owner')
    }
  }

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col justify-center items-center">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="mb-6 w-10 h-10 bg-white rounded-full flex justify-center items-center shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 p-8">
          <h2 className="text-2xl font-bold text-primary mb-1">
            {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {mode === 'login' ? 'Please login to your account.' : 'Register to join Agro-Sathi.'}
          </p>

          {step === 1 && (
            <div className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setRole('farmer')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    role === 'farmer' 
                      ? 'border-primary bg-secondary/30' 
                      : 'border-gray-100 bg-white hover:border-secondary'
                  }`}
                >
                  <div className={`p-2 rounded-full ${role === 'farmer' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <User className="w-6 h-6" />
                  </div>
                  <span className={`font-semibold ${role === 'farmer' ? 'text-primary' : 'text-gray-500'}`}>Customer</span>
                </button>
                
                <button
                  onClick={() => setRole('owner')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                    role === 'owner' 
                      ? 'border-primary bg-secondary/30' 
                      : 'border-gray-100 bg-white hover:border-secondary'
                  }`}
                >
                  <div className={`p-2 rounded-full ${role === 'owner' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Tractor className="w-6 h-6" />
                  </div>
                  <span className={`font-semibold ${role === 'owner' ? 'text-primary' : 'text-gray-500'}`}>Owner</span>
                </button>
              </div>

              {/* Phone Input */}
              <form onSubmit={handleSendOTP} className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1.5 ">Mobile Number</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 sm:text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter mobile number"
                      className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-xl focus:ring-primary focus:border-primary sm:text-sm border-gray-200 border bg-gray-50 outline-none"
                      required
                      maxLength={10}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-[#153428] text-white py-3.5 rounded-xl font-semibold transition-all shadow-md active:scale-[0.98]"
                >
                  Get OTP
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-secondary text-primary rounded-full mx-auto flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-800">OTP Sent successfully!</h3>
                <p className="text-sm text-gray-500 mt-1">We've sent a 4-digit code to +91 {phone}</p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 4-digit OTP (e.g. 1234)"
                    className="block w-full px-4 py-3 text-center tracking-[0.5em] text-2xl rounded-xl focus:ring-primary focus:border-primary border-gray-200 border bg-gray-50 outline-none"
                    required
                    maxLength={4}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-[#153428] text-white py-3.5 rounded-xl font-semibold transition-all shadow-md active:scale-[0.98]"
                >
                  Verify & Login
                </button>

                <p className="text-center text-sm text-gray-500">
                  Didn't receive it? <button type="button" onClick={() => setStep(1)} className="text-primary font-semibold hover:underline">Edit Number</button>
                </p>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm />
    </Suspense>
  )
}
