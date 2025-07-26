'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Order } from '@/lib/types'

export default function MyOrder() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOrders = localStorage.getItem('user-orders')
      if (storedOrders) {
        try {
          const parsed = JSON.parse(storedOrders) as Order[]
          setOrders(parsed)
        } catch (err) {
          console.error('Failed to parse orders:', err)
        }
      }
    }
  }, [])

  // Separate orders by payment type
  const cashOrders = orders.filter((o) => o.paymentType === 'COD' || o.paymentType.toLowerCase().includes('cash'))
  const onlineOrders = orders.filter((o) => o.paymentType !== 'COD' && !o.paymentType.toLowerCase().includes('cash'))

  const baseColor = '#046C4E'

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#046C4E] mb-8 tracking-tight leading-tight">
        My Orders
      </h1>

      {/* Cash on Delivery Orders */}
      {cashOrders.length > 0 && (
        <section>
          <h2
            style={{ color: baseColor }}
            className="text-xl sm:text-2xl font-semibold mb-6 border-l-4 border-[#046C4E] pl-3 tracking-wide"
          >
            Cash on Delivery Orders
          </h2>
          <div className="space-y-8">
            {cashOrders.map((order) => (
              <OrderCard key={order.id} order={order} baseColor={baseColor} />
            ))}
          </div>
        </section>
      )}

      {/* Online Payment Orders */}
      {onlineOrders.length > 0 && (
        <section>
          <h2
            style={{ color: baseColor }}
            className="text-xl sm:text-2xl font-semibold mb-6 border-l-4 border-[#046C4E] pl-3 tracking-wide"
          >
            Online Payment Orders
          </h2>
          <div className="space-y-8">
            {onlineOrders.map((order) => (
              <OrderCard key={order.id} order={order} baseColor={baseColor} />
            ))}
          </div>
        </section>
      )}

      {orders.length === 0 && (
        <p className="text-gray-600 italic text-lg text-center">You have no orders yet.</p>
      )}
    </div>
  )
}

function OrderCard({
  order,
  baseColor,
}: {
  order: Order
  baseColor: string
}) {
  return (
    <article className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
      <header className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h3
            className="text-lg sm:text-xl font-bold"
            style={{ color: baseColor }}
          >{`Order #${order.id}`}</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-tight">
            Date: {new Date(order.orderDate).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:gap-6 text-xs sm:text-sm text-gray-700 leading-snug">
          <p>
            <span className="font-semibold">Payment:</span>{' '}
            <span className={order.isPaid ? 'text-green-600' : 'text-red-600'}>
              {order.isPaid ? 'Paid' : 'Pending'}
            </span>
          </p>
          <p>
            <span className="font-semibold">Method:</span> {order.paymentType}
          </p>
          <p>
            <span className="font-semibold">Total:</span>{' '}
            <span style={{ color: baseColor }}>${order.amount.toFixed(2)}</span>
          </p>
        </div>
      </header>

      <section className="mb-5 text-gray-700 text-xs sm:text-sm leading-relaxed">
        <p className="font-semibold mb-1 tracking-wide">Shipping Address:</p>
        <p>
          {order.address.name}
          <br />
          {order.address.fullAddress}
          <br />
          {order.address.city}, {order.address.state}
          <br />
          {order.address.countryCode}
          <br />
          Phone: {order.address.phone}
        </p>
      </section>

      <section className="space-y-6">
        {order.items.map((item, idx) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-4 border border-gray-200 rounded-md p-3 hover:shadow-lg transition-shadow duration-200"
          >
            {/* Product Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex-shrink-0 flex items-center justify-center rounded overflow-hidden border border-gray-300">
              <Image
                src={item.image[0]}
                alt={item.title}
                width={96}
                height={96}
                className="object-contain"
                priority={idx < 2} // priority loading for first 2 images per order
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-sm sm:text-base text-[#046C4E] leading-tight">
                {item.title}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm leading-snug">
                Qty: {item.quantity} × ${item.offerPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </section>
    </article>
  )
}
