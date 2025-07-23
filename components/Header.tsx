'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { Lobster } from 'next/font/google'
import { Button } from './ui/button'
import Image from 'next/image'
import Login from './Login'

const lobster = Lobster({ weight: '400', subsets: ['latin'] })

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [showProfileMenu, setShowProfileMenu] = React.useState(false)
  const [showLoginForm, setShowLoginForm] = React.useState(false)
  const pathname = usePathname()
  const profileMenuRef = React.useRef<HTMLDivElement>(null)

  const toggleMenu = () => setOpen((prev) => !prev)

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

  return (
    <>
      <main className='relative flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-5 border-b border-gray-200 bg-white z-50'>
        {/* Logo */}
        <Link
          href='/'
          className={`${lobster.className} text-2xl md:text-3xl lg:text-4xl text-[#046C4E] select-none z-50`}
          aria-label='Homepage'
        >
          PremuimCars
        </Link>

        {/* Desktop Menu */}
        <div className='hidden lg:flex items-center w-full ml-auto justify-end gap-10'>
          {/* NavLinks + Search */}
          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-6'>
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

            {/* Search Bar */}
            <div className='hidden xl:flex items-center text-sm gap-2 border-2 border-[#046C4E] rounded-full px-4 py-2 bg-white shadow-sm'>
              <input
                className='w-full bg-transparent outline-none placeholder-gray-400 font-normal tracking-wide text-sm px-1 py-0.5'
                type='text'
                placeholder='Search products'
                aria-label='Search products'
              />
              <span>
                <Search size={18} />
              </span>
            </div>
          </div>

          {/* Cart + Auth */}
          <div className='flex items-center gap-6'>
            <Link href='/cart'>
              <div className='relative cursor-pointer text-gray-700 hover:text-[#046C4E] transition duration-300'>
                <ShoppingCart size={22} />
                <span className='absolute -top-2 -right-3 text-xs font-bold text-white bg-[#046C4E] w-[20px] h-[20px] rounded-full flex items-center justify-center leading-none select-none'>
                  3
                </span>
              </div>
            </Link>

            {isLoggedIn ? (
              <div className='relative' ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className='flex items-center gap-2 text-gray-700 hover:text-[#046C4E] transition'
                  aria-label='Profile'
                >
                  <Image
                    src='/images/profileIcon.png'
                    width={40}
                    height={40}
                    alt='Profile'
                    className='rounded-full object-cover'
                  />
                </button>

                {showProfileMenu && (
                  <div className='absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50'>
                    <Link
                      href='/my-orders'
                      className='block px-4 py-2 text-gray-700 hover:bg-gray-100 transition'
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false)
                        setShowProfileMenu(false)
                      }}
                      className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => setShowLoginForm(true)}
                className='text-sm font-semibold px-4 py-2'
              >
                Log In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          aria-label='Toggle menu'
          className='fixed top-4 md:right-12 right-4 w-[50px] h-[50px] lg:hidden bg-[#046C4E] text-white rounded-full justify-center items-center flex transition duration-300 z-50'
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </main>

      {/* Mobile Menu */}
      {open && (
        <div className='fixed top-10 left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-5 lg:hidden z-40 max-h-[calc(100vh-64px)] overflow-y-auto'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className='w-full text-gray-700 text-[15px] font-medium tracking-wide uppercase py-2 transition hover:text-[#046C4E]'
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <>
              <Link
                href='/orders'
                onClick={toggleMenu}
                className='w-full px-4 py-2 text-[15px] font-semibold rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-center'
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  setIsLoggedIn(false)
                  toggleMenu()
                }}
                className='w-full px-4 py-2 text-[15px] font-semibold rounded-full bg-[#046C4E] hover:bg-[#6F42C1] text-white'
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                toggleMenu()
                setShowLoginForm(true)
              }}
              className='w-full px-4 py-2 text-[15px] font-semibold rounded-full bg-[#046C4E] hover:bg-[#6F42C1] text-white transition'
            >
              Log In
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      <Login isOpen={showLoginForm} onClose={() => setShowLoginForm(false)} />
    </>
  )
}
