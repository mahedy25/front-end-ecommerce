'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SellerLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const router = useRouter() // 🔁 Add router

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setMessage('Please enter both email and password')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('http://localhost:5000/api/seller/login', {
        method: 'POST',
        credentials: 'include', // for cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setMessage('Login successful!')
        router.push('/dashboard') // 🔁 Redirect on success
      } else {
        setMessage(data.message || 'Login failed')
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage('Login failed due to network or server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f3f9f7] py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#046C4E] mb-6">Seller Login</h2>
        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#046C4E] hover:bg-[#035d3e] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {message && (
            <p className="mt-4 text-center text-red-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
