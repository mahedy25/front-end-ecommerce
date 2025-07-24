'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Trash2, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAppContext } from '@/app/context/AppContext' // Adjust path

export default function Cart() {
  const {
    cart: products,
    updateQuantity,
    removeFromCart,
  } = useAppContext()
  const router = useRouter()

  const [showAddress] = useState(false)

  const subtotal = products.reduce((sum, p) => sum + p.offerPrice * p.quantity, 0)
  const tax = subtotal * 0.02
  const shippingFee = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shippingFee

  const handleRemove = (id: string) => {
    removeFromCart(id)
    toast.success('Product removed from cart')
  }

  const handleContinueShopping = () => {
    router.push('/all-products')
  }

  const handleAddressChange = () => {
    router.push('/shipping-address')
  }

  const handlePlaceOrder = () => {
    if (!showAddress) {
      toast.error('Please add a delivery address before placing order.')
      return
    }
    // If online payment selected, go to checkout
    const paymentMethod = (document.getElementById('paymentMethod') as HTMLSelectElement)?.value
    if (paymentMethod === 'Online') {
      router.push('/checkout')
    } else {
      alert('Order placed with Cash On Delivery!')
    }
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      <section className="flex-1 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#046C4E] mb-6 sm:mb-8">
          Shopping Cart{' '}
          <span className="text-xs sm:text-sm md:text-base text-[#046C4E]/70 font-normal">
            {products.length} {products.length === 1 ? 'Item' : 'Items'}
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-600 text-xs sm:text-sm font-semibold border-b border-gray-300 pb-2 mb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {products.length === 0 && (
          <p className="text-gray-500 italic text-xs sm:text-sm">Your cart is empty.</p>
        )}

        {products.map((product) => (
          <article
            key={product.id}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-700 font-medium text-xs sm:text-sm md:text-base py-3 border-b border-gray-200"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 border border-gray-300 rounded-md overflow-hidden flex-shrink-0 relative">
                <Image
                  src={product.image[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority
                  unoptimized
                />
              </div>
              <div>
                <h2 className="hidden md:block text-base sm:text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Category: {product.category}</p>
                <label
                  htmlFor={`qty-${product.id}`}
                  className="mt-2 flex items-center gap-1 sm:gap-2 text-gray-600 text-[11px] sm:text-sm font-normal"
                >
                  Qty:
                  <select
                    id={`qty-${product.id}`}
                    className="border border-gray-300 rounded px-1 py-0.5 sm:px-2 sm:py-1 text-[11px] sm:text-sm outline-none"
                    value={product.quantity}
                    onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <p className="text-center text-sm sm:text-lg font-semibold text-[#046C4E]">
              ${Number(product.offerPrice * product.quantity).toLocaleString()}
            </p>

            <button
              onClick={() => handleRemove(product.id)}
              aria-label={`Remove ${product.title} from cart`}
              className="mx-auto text-[#046C4E] hover:text-red-600 transition"
              type="button"
            >
              <Trash2 size={18} />
            </button>
          </article>
        ))}

        <button
          type="button"
          className="inline-flex items-center gap-1 mt-8 sm:mt-10 text-[#046C4E] font-semibold text-xs sm:text-sm hover:underline"
          onClick={handleContinueShopping}
        >
          <ChevronLeft size={16} />
          Continue Shopping
        </button>
      </section>

      <aside className="max-w-md w-full bg-[#f3f9f7] p-5 sm:p-6 rounded-lg border border-[#046C4E]/30 shadow-sm sticky top-20 self-start">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#046C4E] mb-4 sm:mb-5">Order Summary</h2>
        <hr className="border-gray-300 mb-4 sm:mb-5" />

        <div>
          <p className="uppercase font-semibold text-xs sm:text-sm text-[#046C4E] mb-1 sm:mb-2">Delivery Address</p>
          <div className="relative flex justify-between items-start">
            <p className="text-gray-600 text-xs sm:text-sm">{showAddress ? 'New York, USA' : 'No address found'}</p>
            <button
              onClick={handleAddressChange}
              className="text-[#046C4E] hover:underline text-xs sm:text-sm font-medium ml-3 sm:ml-4"
              type="button"
            >
              {showAddress ? 'Change' : 'Add'}
            </button>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <label
            htmlFor="paymentMethod"
            className="uppercase font-semibold text-xs sm:text-sm text-[#046C4E] mb-1 sm:mb-2 block"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="w-full border border-gray-300 bg-white px-2 py-1 rounded outline-none text-xs sm:text-sm"
            defaultValue="COD"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300 my-5 sm:my-6" />

        <div className="text-gray-700 space-y-2 sm:space-y-3 text-xs sm:text-sm font-semibold">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className={shippingFee === 0 ? 'text-green-600' : ''}>
              {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base sm:text-lg font-bold mt-3 sm:mt-4 border-t border-gray-300 pt-2 sm:pt-3">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="w-full mt-5 sm:mt-6 py-2.5 sm:py-3 rounded bg-[#046C4E] text-white font-semibold hover:bg-[#035d3e] transition text-sm sm:text-base"
          type="button"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </aside>
    </main>
  )
}
