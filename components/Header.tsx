'use client'

import React from 'react'
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
  { name: 'All Products', href: '/all-products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [showProfileMenu, setShowProfileMenu] = React.useState(false)
  const [showLoginForm, setShowLoginForm] = React.useState(false)
  const [showMobileSearch, setShowMobileSearch] = React.useState(false)
  const profileMenuRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const { cart, searchQuery, setSearchQuery } = useAppContext()

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  const handleSearch = () => {
    const trimmed = searchQuery.trim()
    if (trimmed) {
      setShowMobileSearch(false)
      router.push(`/all-products?q=${encodeURIComponent(trimmed)}`)
    }
  }

  const toggleMenu = () => {
    if (showMobileSearch) setShowMobileSearch(false)
    setOpen((prev) => !prev)
  }

  const toggleSearch = () => {
    if (open) setOpen(false)
    setShowMobileSearch((prev) => !prev)
  }

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    if (showMobileSearch && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showMobileSearch])

  return (
    <>
      <header className="relative z-50 bg-white border-b border-gray-200">
        <main className="flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-5">
          <Link
            href="/"
            className={`${lobster.className} text-2xl md:text-3xl mt-1 lg:text-4xl text-[#046C4E] select-none z-50`}
          >
            PremuimCars
          </Link>

          <div className="hidden lg:flex items-center w-full ml-auto justify-end gap-10">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative text-sm font-medium tracking-wider uppercase hover:text-[#0F52BA] transition-colors duration-300 group ${
                        isActive ? 'text-[#0F52BA]' : 'text-gray-700'
                      }`}
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
              </div>

              <div className="hidden md:flex items-center text-sm gap-2 border-2 border-[#046C4E] rounded-full px-4 py-2 bg-white shadow-sm">
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
            </div>

            <div className="flex items-center gap-6">
              <Link href="/cart">
                <div className="relative cursor-pointer text-gray-700 hover:text-[#046C4E] transition duration-300">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 text-xs font-bold text-white bg-[#046C4E] w-[20px] h-[20px] rounded-full flex items-center justify-center leading-none select-none">
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
                        href="/my-orders"
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

          {/* MOBILE: Fixed Search button top-left */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              className="fixed top-6 right-18 md:right-25 z-60 px-3 py-1.5 text-sm shadow-md bg-white border border-[#046C4E]"
              onClick={toggleSearch}
            >
              Search
            </Button>
          </div>

          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="fixed top-4 right-4 w-[50px] h-[50px] lg:hidden bg-[#046C4E] text-white rounded-full justify-center items-center flex transition duration-300 z-[60]"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </main>

        {/* Mobile search bar */}
        {showMobileSearch && (
          <div className="w-full md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white flex flex-col md:flex-row gap-5 justify-center items-center">
            <input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for a product"
              className="border-2 border-[#046C4E] w-full max-w-md px-4 py-2 rounded-full text-base text-gray-800 placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-[#046C4E]"
            />
            <div>
              <Button
                onClick={handleSearch}
                className="ml-4 bg-[#046C4E] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#034736] transition text-sm"
              >
                Search
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowMobileSearch(false)}
                className="ml-4 bg-red-900 text-white px-5 py-2 rounded-full shadow-md hover:bg-red-700 transition text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Mobile sliding menu */}
        {open && (
          <div className="fixed top-15 left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-5 lg:hidden z-40 max-h-[calc(100vh-64px)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="w-full text-gray-700 text-[15px] font-medium tracking-wide uppercase py-2 transition hover:text-[#046C4E]"
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-2 text-[15px] font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setOpen(false)
                  }}
                  className="w-full px-4 py-2 text-[15px] font-semibold rounded-full bg-[#046C4E] hover:bg-[#6F42C1] text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpen(false)
                  setShowLoginForm(true)
                }}
                className="w-full px-4 py-2 text-[15px] font-semibold rounded-full bg-[#046C4E] hover:bg-[#6F42C1] text-white transition"
              >
                Log In
              </button>
            )}
          </div>
        )}
      </header>

      {/* Login modal */}
      <Login isOpen={showLoginForm} onClose={() => setShowLoginForm(false)} />
    </>
  )
}
