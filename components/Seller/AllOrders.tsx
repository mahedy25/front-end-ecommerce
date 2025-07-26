'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Order } from '@/lib/types'
import { toast } from 'sonner'

const ORDER_STATUSES = ['Pending', 'Processing', 'Delivering', 'Delivered', 'Cancelled']

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const storedOrders = localStorage.getItem('user-orders')
    if (storedOrders) {
      try {
        const parsed = JSON.parse(storedOrders) as Order[]
        setOrders(parsed)
      } catch (err) {
        console.error('Failed to parse orders:', err)
      }
    }
  }, [])

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('user-orders', JSON.stringify(updatedOrders))
    toast.success(`Order #${orderId} status updated to ${newStatus}`)
  }

  return (
    <div className="max-w-6xl mx-auto md:p-4 space-y-10">
      <h1 className="text-3xl font-extrabold text-[#046C4E] mb-8">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 italic">No orders available.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-200 shadow-md p-6 space-y-4"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-xl font-bold text-[#046C4E]">Order #{order.id}</h2>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>
              <div className="mt-3 md:mt-0">
                <label className="text-sm font-semibold text-gray-700 mr-2">Status:</label>
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 cursor-pointer"
                  value={order.status || 'Pending'}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  {ORDER_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">Shipping Address:</p>
              <p>{order.address.name}</p>
              <p>{order.address.fullAddress}</p>
              <p>
                {order.address.city}, {order.address.state} ({order.address.countryCode})
              </p>
              <p>Phone: {order.address.phone}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-shring-0 gap-4 border border-gray-200 p-3 rounded-lg hover:shadow-sm"
                >
                  <div className="w-20 h-10 relative border border-gray-300 rounded-md">
                    <Image
                      src={item.image[0]}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="80px"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-[#046C4E] text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-xs text-gray-500">Price: ${item.offerPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-right text-sm font-semibold text-[#046C4E]">
              Total: ${order.amount.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  )
}