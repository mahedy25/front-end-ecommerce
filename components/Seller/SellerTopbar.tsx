'use client'
import Image from 'next/image'

export default function SellerTopbar() {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
      <h1 className="text-sm md:text-lg font-semibold">Seller Dashboard</h1>
      <div className="flex text-sm md:text-base items-center gap-4 text-gray-600">
        <p>Hi! Seller</p>
        <Image
          src="/images/seller.png"
          alt="Seller"
          width={32}
          height={32}
          className="rounded-full"
        />
        <button className="border px-4 py-1 rounded-full text-sm">Logout</button>
      </div>
    </div>
  )
}
