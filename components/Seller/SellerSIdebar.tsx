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
    <div className="md:w-64 w-20 border-r border-gray-300 h-screen py-4 px-2 bg-white flex flex-col">
      {sidebarLinks.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-3 py-2 my-1 rounded-md transition-all
              ${isActive
                ? 'bg-indigo-100 text-indigo-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            {item.icon}
            <span className="hidden md:inline text-sm">{item.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
