'use client'
import axios from '@/lib/axios'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Product } from '@/lib/types'

type CartItem = Product & { quantity: number }

axios.defaults.withCredentials = true

type AppContextType = {
  cart: CartItem[]
  addToCart: (product: Product) => void
  updateQuantity: (id: string, qty: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null)
  const router = useRouter()

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    }
  }, [])

  // Sync cart to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setLastAddedProduct(product)
  }

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
    toast.success('Product removed from cart')
  }

  const clearCart = () => {
    setCart([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart')
    }
  }

  // Show success notification when product is added or quantity is increased
  useEffect(() => {
    if (!lastAddedProduct) return

    const existing = cart.find((item) => item.id === lastAddedProduct.id)
    if (existing?.quantity && existing.quantity > 1) {
      toast.success(`Increased quantity of "${lastAddedProduct.title}"`)
    } else {
      toast.success(`Added "${lastAddedProduct.title}" to cart`)
    }

    setLastAddedProduct(null)
  }, [cart, lastAddedProduct])

  // Search functionality
  const handleSearch = () => {
    const trimmed = searchQuery.trim()
    if (!trimmed) return
    router.push(`/all-products?search=${encodeURIComponent(trimmed)}`)
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        searchQuery,
        setSearchQuery,
        handleSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
