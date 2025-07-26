'use client'

import { PlusCircle, List, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SellerDashboard() {
  const pathname = usePathname()

  const sidebarLinks = [
    { name: "Add Products", path: "/add-product", icon: <PlusCircle className="w-6 h-6" /> },
    { name: "Product Lists", path: "/product-list", icon: <List className="w-6 h-6" /> },
    { name: "All Orders", path: "/all-orders", icon: <Package className="w-6 h-6" /> },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="md:w-64 w-16 border-r border-gray-300 bg-white h-screen pt-4 flex flex-col">

        <div className="flex flex-col gap-4">
          {sidebarLinks.map((item, index) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={index}
                href={item.path}
                className={`flex items-center py-3 px-4 gap-3 transition-colors duration-200
                  ${isActive ? "border-r-4 md:border-r-[6px] bg-indigo-50 border-indigo-500 text-indigo-600 font-semibold" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                {item.icon}
                <p className="md:block hidden">{item.name}</p>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#046C4E]">Dashboard</h2>
          </div>
          <div className="flex gap-4 items-center text-sm md:text-base text-gray-600">
            <p>Hi, Seller</p>
            <button className="border rounded-full text-sm px-4 py-1">Logout</button>
          </div>
        </div>

        {/* Dynamic Content */}
        <div>
          {pathname === "/add-product" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#046C4E]">Add New Product</h3>
              <p className="text-gray-600">Manage your products by adding new ones to your store.</p>
            </div>
          )}
          {pathname === "/product-list" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#046C4E]">Product List</h3>
              <p className="text-gray-600">View and manage the list of products available in your store.</p>
            </div>
          )}
          {pathname === "/all-orders" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-[#046C4E]">All Orders</h3>
              <p className="text-gray-600">Check the status of all your orders here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
