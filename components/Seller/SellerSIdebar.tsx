'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PlusCircle, List, Package } from 'lucide-react'

const sidebarLinks = [
  { name: 'Add Products', path: '/dashboard/add-product', icon: <PlusCircle className="w-5 h-5" /> },
  { name: 'Product List', path: '/dashboard/product-list', icon: <List className="w-5 h-5" /> },
  { name: 'All Orders', path: '/dashboard/all-orders', icon: <Package className="w-5 h-5" /> },
]

export default function SellerSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:flex-col w-64 border-r border-gray-200 h-screen py-6 px-4 bg-white sticky top-0">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Dashboard</h2>
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-100 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>

      {/* Bottom Nav for Mobile */}
      <div className="fixed bottom-0 md:hidden z-50 bg-white border-t border-gray-200 w-full flex justify-around items-center py-2">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center text-xs font-medium ${
                isActive ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              {item.icon}
              <span className="text-[10px]">{item.name.split(' ')[0]}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
