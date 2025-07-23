'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function Newsletter() {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <div className='mt-20 sm:mt-24 md:mt-32 lg:mt-40 md:grid md:grid-cols-2 max-w-4xl bg-white mx-4 md:mx-auto overflow-hidden shadow-md'>
        {/* Left Side: Text */}
        <div className='flex items-center justify-center'>
          <div className='max-md:py-20 px-6 md:px-10 text-center'>
            <h1 className='text-3xl font-bold'>Subscribe to our newsletter</h1>
            <p className='mt-4 text-gray-500'>
              Be the first to get the latest news about trends, promotions, and
              much more!
            </p>

            <form className='mt-8 flex flex-col sm:flex-row gap-2 sm:gap-0'>
              <input
                type='email'
                placeholder='Your email address'
                className='w-full outline-none rounded-md sm:rounded-l-md sm:rounded-r-none border border-gray-300 p-4 text-gray-900'
              />
              <button
                type='submit'
                className='cursor-pointer rounded-md sm:rounded-l-none sm:rounded-r-md bg-[#046C4E] px-7 py-2 text-white'
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className='w-full'>
          <Image
            src='/images/futuristic-sports-car-night.jpg'
            alt='newsletter'
            width={600}
            height={600}
            className='w-full h-full object-cover'
          />
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <div className='fixed bottom-6 right-6 z-50'>
          <button
            onClick={scrollToTop}
            className='bg-[#046C4E] text-white p-3 rounded-full shadow-lg hover:bg-[#035A41] transition cursor-pointer'
            aria-label='Back to top'
          >
            <ArrowUp size={20} />
          </button>
        </div>
      )}
    </main>
  )
}
