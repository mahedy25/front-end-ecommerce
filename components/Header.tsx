'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { Lobster } from 'next/font/google'
import { Button } from './ui/button'
import Image from 'next/image'
import Login from './Login'
import { useAppContext } from '@/app/context/AppContext'

const lobster = Lobster({ weight: '400', subsets: ['latin'] })

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'All', href: '/all-products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [searchActive, setSearchActive] = useState(false)

  const profileMenuRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { cart, searchQuery, setSearchQuery } = useAppContext()
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  const toggleMenu = (type: 'menu' | 'search') => {
    if (type === 'menu') {
      setSearchActive(false)
      setMenuOpen((prev) => !prev)
    } else {
      setMenuOpen(false)
      setSearchActive((prev) => !prev)
    }
  }

  const handleSearch = () => {
    const trimmed = searchQuery.trim()
    if (trimmed) {
      setSearchActive(false)
      router.push(`/all-products?q=${encodeURIComponent(trimmed)}`)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchActive && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchActive])

  return (
    <>
      <header className="relative z-50 bg-white border-b border-gray-200">
        <main className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-4">
          {/* Logo */}
          <Link
            href="/"
            className={`${lobster.className} text-2xl sm:text-3xl lg:text-4xl text-[#046C4E] select-none z-50`}
          >
            PremuimCars
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center justify-end gap-10 ml-auto w-full">
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-medium uppercase tracking-wide hover:text-[#0F52BA] transition ${
                      isActive ? 'text-[#0F52BA]' : 'text-gray-700'
                    } group`}
                  >
                    {link.name}
                    <span
                      className={`absolute bottom-0 top-6 left-0 h-[2px] bg-[#0F52BA] transition-all duration-300 ease-in-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Only show full search bar in xl screens and up */}
            <div className="hidden xl:flex items-center border border-[#046C4E] rounded-full px-4 py-2 shadow-sm bg-white">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-transparent outline-none placeholder-gray-400 text-sm px-1 py-0.5"
                type="text"
                placeholder="Search products"
              />
              <button onClick={handleSearch}>
                <Search size={18} />
              </button>
            </div>

            {/* Show search button in lg only */}
            <Button
              onClick={() => toggleMenu('search')}
              variant="outline"
              className="lg:flex xl:hidden px-2 py-1 border-[#046C4E]"
            >
              <Search size={18} />
            </Button>

            {/* Cart & profile */}
            <div className="flex items-center gap-6">
              <Link href="/cart">
                <div className="relative cursor-pointer text-gray-700 hover:text-[#046C4E] transition">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 text-xs font-bold text-white bg-[#046C4E] w-[20px] h-[20px] rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {isLoggedIn ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#046C4E] transition"
                  >
                    <Image
                      src="/images/profileIcon.png"
                      width={40}
                      height={40}
                      alt="Profile"
                      className="rounded-full object-cover"
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false)
                          setShowProfileMenu(false)
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={() => setShowLoginForm(true)}
                  className="text-sm font-semibold px-4 py-2"
                >
                  Log In
                </Button>
              )}
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="outline"
              className="text-sm shadow-sm border border-[#046C4E] px-3 py-1.5"
              onClick={() => toggleMenu('search')}
            >
              <Search size={18} />
            </Button>
            <button
              onClick={() => toggleMenu('menu')}
              aria-label="Toggle menu"
              className="w-10 h-10 bg-[#046C4E] text-white rounded-full flex items-center justify-center z-50"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </main>

        {/* Mobile Search Bar */}
        {searchActive && (
          <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-4 border-b border-gray-200 bg-white flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a product"
              className="w-full max-w-md border border-[#046C4E] px-4 py-2 rounded-full text-base text-gray-800 placeholder-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-[#046C4E]"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                className="bg-[#046C4E] text-white px-5 py-2 rounded-full text-sm"
              >
                Search
              </Button>
              <Button
                variant="ghost"
                onClick={() => setSearchActive(false)}
                className="bg-red-700 text-white px-5 py-2 rounded-full text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed top-16 left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-5 lg:hidden z-40 max-h-[calc(100vh-64px)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 text-[15px] font-medium uppercase tracking-wide py-2 hover:text-[#046C4E]"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="relative flex items-center gap-2 text-gray-700 hover:text-[#046C4E] transition text-[15px]"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs font-bold text-white bg-[#046C4E] w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-[15px]"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setMenuOpen(false)
                  }}
                  className="w-full py-2 rounded-full bg-[#046C4E] hover:bg-[#6F42C1] text-white font-semibold text-[15px]"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setShowLoginForm(true)
                }}
                className="w-full py-2 rounded-full bg-[#046C4E] hover:bg-[#6F42C1] text-white font-semibold text-[15px]"
              >
                Log In
              </button>
            )}
          </div>
        )}
      </header>

      {/* Login Modal */}
      <Login isOpen={showLoginForm} onClose={() => setShowLoginForm(false)} />
    </>
  )
}
