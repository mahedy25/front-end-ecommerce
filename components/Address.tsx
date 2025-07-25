'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import { Address } from '@/lib/types'

// Extend Address locally to add 'id' for managing multiple addresses in localStorage
type StoredAddress = Address & { id: string }

export default function AddressForm() {
  const router = useRouter()
  const [form, setForm] = useState<Address>({
    name: '',
    countryCode: '+880',
    phone: '',
    city: '',
    state: '',
    fullAddress: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (
      !form.name ||
      !form.phone ||
      !form.city ||
      !form.state ||
      !form.fullAddress
    ) {
      toast.error('Please fill in all fields')
      return
    }

    const newAddress: StoredAddress = {
      ...form,
      id: Date.now().toString(), // simple unique id based on timestamp
    }

    if (typeof window !== 'undefined') {
      let addresses: StoredAddress[] = []
      const stored = localStorage.getItem('user-addresses')
      if (stored) {
        try {
          addresses = JSON.parse(stored) as StoredAddress[]
        } catch {
          addresses = []
        }
      }

      // Add new address to saved addresses list
      addresses.push(newAddress)

      localStorage.setItem('user-addresses', JSON.stringify(addresses))

      // Save the currently selected address separately
      localStorage.setItem('user-selected-address', JSON.stringify(newAddress))
    }

    toast.success('Address saved successfully')
    router.push('/cart')
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
      {/* Left side image */}
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <Image
          src="/images/address.png"
          alt="Address illustration"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Right side form */}
      <div className="w-full lg:flex-1 bg-white p-6 sm:p-8 border border-gray-200 rounded-xl shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#046C4E] mb-6">Add Delivery Address</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-sm">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded outline-none text-sm border-gray-300 focus:ring-2 focus:ring-[#046C4E]"
              required
            />
          </div>

          <div className="flex gap-3">
            <div className="w-1/3">
              <label className="block mb-1 font-medium text-sm">Code</label>
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-sm cursor-pointer border-gray-300"
              >
                <option value="+880">🇧🇩 +880</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium text-sm">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                className="w-full px-4 py-2 border rounded outline-none text-sm border-gray-300 focus:ring-2 focus:ring-[#046C4E]"
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-sm">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded outline-none text-sm border-gray-300 focus:ring-2 focus:ring-[#046C4E]"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium text-sm">State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded outline-none text-sm border-gray-300 focus:ring-2 focus:ring-[#046C4E]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-sm">Full Address</label>
            <textarea
              name="fullAddress"
              value={form.fullAddress}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border rounded outline-none text-sm border-gray-300 focus:ring-2 focus:ring-[#046C4E]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-[#046C4E] text-white font-semibold rounded hover:bg-[#035d3e] transition text-base cursor-pointer"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </main>
  )
}
