'use client'

import React, { useRef, useEffect } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function Login({ isOpen, onClose }: Props) {
  const [state, setState] = React.useState<'login' | 'register'>('login')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form
        ref={formRef}
        className="flex flex-col gap-4 items-start p-8 py-10 w-[90%] sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-[#046C4E]">User</span>{' '}
          {state === 'login' ? 'Login' : 'Sign Up'}
        </p>

        {state === 'register' && (
          <div className="w-full">
            <p className="text-sm text-gray-600">Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#046C4E]"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="text-sm text-gray-600">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#046C4E]"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="text-sm text-gray-600">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#046C4E]"
            type="password"
            required
          />
        </div>

        {state === 'register' ? (
          <p className="text-sm">
            Already have an account?{' '}
            <span
              onClick={() => setState('login')}
              className="text-[#046C4E] cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account?{' '}
            <span
              onClick={() => setState('register')}
              className="text-[#046C4E] cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}

        <button className="bg-[#046C4E] hover:bg-[#03553f] transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  )
}
