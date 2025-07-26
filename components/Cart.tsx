'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Trash2, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAppContext } from '@/app/context/AppContext'
import { Address, Order } from '@/lib/types'

export default function Cart() {
  const { cart: products, updateQuantity, removeFromCart, clearCart } = useAppContext()
  const router = useRouter()

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([])
  const [savedAddress, setSavedAddress] = useState<Address | null>(null)
  const [showAddressDropdown, setShowAddressDropdown] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('COD')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const addressesRaw = localStorage.getItem('user-addresses')
        if (addressesRaw) {
          const addresses: Address[] = JSON.parse(addressesRaw)
          setSavedAddresses(addresses)

          const selectedRaw = localStorage.getItem('user-selected-address')
          if (selectedRaw) {
            setSavedAddress(JSON.parse(selectedRaw))
          } else if (addresses.length > 0) {
            setSavedAddress(addresses[0])
          }
        }
      } catch {
        setSavedAddresses([])
      }
    }
  }, [])

  const handleRemove = (id: string) => {
    removeFromCart(id)
    toast.success('Product removed from cart')
  }

  const handleContinueShopping = () => router.push('/all-products')

  const handleAddressChangeClick = () => {
    setShowAddressDropdown(false)
    router.push('/address')
  }

  const handleAddressSelect = (address: Address) => {
    setSavedAddress(address)
    setShowAddressDropdown(false)
    localStorage.setItem('user-selected-address', JSON.stringify(address))
    toast.success('Delivery address selected')
  }

  const handleDeleteAddress = (index: number) => {
    const updated = savedAddresses.filter((_, i) => i !== index)
    setSavedAddresses(updated)
    localStorage.setItem('user-addresses', JSON.stringify(updated))

    if (JSON.stringify(savedAddresses[index]) === JSON.stringify(savedAddress)) {
      if (updated.length > 0) {
        setSavedAddress(updated[0])
        localStorage.setItem('user-selected-address', JSON.stringify(updated[0]))
      } else {
        setSavedAddress(null)
        localStorage.removeItem('user-selected-address')
      }
    }

    toast.success('Address deleted')
  }

  const subtotal = products.reduce((sum, p) => sum + p.offerPrice * p.quantity, 0)
  const tax = subtotal * 0.02
  const shippingFee = subtotal > 100 ? 0 : 10
  const total = subtotal + tax + shippingFee

  const handlePlaceOrder = () => {
    if (!savedAddress) {
      toast.error('Please add a delivery address before placing order.')
      return
    }
    if (products.length === 0) {
      toast.error('Your cart is empty.')
      return
    }

    // Use timestamp string as order id
    const orderId = Date.now().toString()

    const newOrder: Order = {
      id: orderId,
      status: '',
      items: products,
      address: savedAddress,
      amount: total,
      paymentType: paymentMethod,
      orderDate: new Date().toISOString(),
      isPaid: paymentMethod === 'Online' ? false : false, // extend as needed
    }

    const existingOrdersRaw = localStorage.getItem('user-orders')
    const existingOrders: Order[] = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : []

    const updatedOrders = [...existingOrders, newOrder]
    localStorage.setItem('user-orders', JSON.stringify(updatedOrders))

    toast.success('Order placed successfully!')

    clearCart()

    router.push('/orders')
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-10 py-10 md:py-14 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
      <section className="flex-1 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#046C4E] mb-6 sm:mb-8 leading-snug">
          Shopping Cart{' '}
          <span className="block sm:inline text-sm sm:text-base md:text-lg text-[#046C4E]/70 font-normal ml-1">
            ({products.length} {products.length === 1 ? 'Item' : 'Items'})
          </span>
        </h1>

        {products.length === 0 && (
          <p className="text-gray-500 italic text-sm sm:text-base">Your cart is empty.</p>
        )}

        {products.length > 0 && (
          <>
            <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr] text-gray-600 text-sm sm:text-base font-semibold border-b border-gray-300 pb-2 mb-4">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            <div className="space-y-4">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] items-center gap-4 bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 border border-gray-300 rounded-md overflow-hidden relative flex-shrink-0">
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
                    <div className="flex flex-col">
                      <h2 className="text-base sm:text-lg font-semibold">{product.title}</h2>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">Category: {product.category}</p>
                      <label htmlFor={`qty-${product.id}`} className="mt-2 text-gray-600 text-sm sm:text-base">
                        Qty:
                        <select
                          id={`qty-${product.id}`}
                          className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm sm:text-base outline-none cursor-pointer"
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

                  <p className="text-center font-semibold text-[#046C4E]">
                    ${Number(product.offerPrice * product.quantity).toLocaleString()}
                  </p>

                  <div className="flex justify-center sm:justify-end">
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-[#046C4E] hover:text-red-600 transition cursor-pointer"
                      aria-label={`Remove ${product.title}`}
                      type="button"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-1 mt-8 text-[#046C4E] font-semibold text-sm sm:text-base hover:underline cursor-pointer"
              onClick={handleContinueShopping}
            >
              <ChevronLeft size={18} />
              Continue Shopping
            </button>
          </>
        )}
      </section>

      <aside className="max-w-md w-full bg-[#f3f9f7] p-6 sm:p-8 rounded-lg border border-[#046C4E]/30 shadow-md top-20 self-start relative">
        <h2 className="text-xl sm:text-2xl font-bold text-[#046C4E] mb-5">Order Summary</h2>

        <div>
          <p className="uppercase font-semibold text-sm text-[#046C4E] mb-2">Delivery Address</p>
          <div className="relative flex justify-between items-start">
            <div className="flex flex-col flex-1">
              {savedAddress ? (
                <>
                  <p className="text-gray-600 text-sm">{savedAddress.fullAddress}</p>
                  <p className="text-gray-600 text-sm">
                    {savedAddress.city}, {savedAddress.state}
                  </p>
                  <p className="text-gray-600 text-sm">Phone: {savedAddress.phone}</p>
                </>
              ) : (
                <p className="text-gray-600 text-sm">No address found</p>
              )}
            </div>
            <button
              onClick={() => setShowAddressDropdown((prev) => !prev)}
              className="text-[#046C4E] hover:underline text-sm font-medium cursor-pointer ml-2"
              type="button"
              aria-expanded={showAddressDropdown}
              aria-controls="address-dropdown"
            >
              {savedAddress ? 'Change' : 'Add'}
            </button>
          </div>

          {showAddressDropdown && (
            <div
              id="address-dropdown"
              className="absolute top-24 right-0 z-10 bg-white border border-gray-300 rounded shadow-md w-full max-w-xs max-h-48 overflow-auto"
            >
              {savedAddresses.length === 0 ? (
                <p className="p-2 text-gray-500 text-center">No saved addresses</p>
              ) : (
                savedAddresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-2 hover:bg-[#046C4E]/10 text-sm"
                  >
                    <p
                      onClick={() => handleAddressSelect(address)}
                      className="cursor-pointer flex-1"
                    >
                      {address.fullAddress}, {address.city}
                    </p>
                    <button
                      onClick={() => handleDeleteAddress(index)}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}

              <p
                onClick={handleAddressChangeClick}
                className="cursor-pointer px-4 py-2 hover:bg-[#046C4E]/20 text-indigo-600 font-medium text-center border-t border-gray-300"
              >
                Add new address
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <label
            htmlFor="paymentMethod"
            className="uppercase font-semibold text-sm text-[#046C4E] mb-2 block"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="w-full border border-gray-300 bg-white px-3 py-2 rounded text-sm cursor-pointer"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300 my-6" />

        <div className="text-gray-700 space-y-3 text-sm font-semibold">
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
          <div className="flex justify-between text-base sm:text-lg font-bold mt-4 border-t border-gray-300 pt-3">
            <span>Total Amount:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="w-full mt-6 py-3 rounded bg-[#046C4E] text-white font-semibold hover:bg-[#035d3e] transition text-base cursor-pointer"
          type="button"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </aside>
    </main>
  )
}
