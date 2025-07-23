'use client'

import React from 'react'
import Link from 'next/link'
import { Lobster } from 'next/font/google'

const lobster = Lobster({ weight: '400', subsets: ['latin'] })

const Footer: React.FC = () => {
  const linkSections = [
    {
      title: 'Quick Links',
      links: ['Home', 'Best Sellers', 'Offers & Deals', 'Contact Us', 'FAQs'],
    },
    {
      title: 'Need Help?',
      links: [
        'Delivery Information',
        'Return & Refund Policy',
        'Payment Methods',
        'Track your Order',
        'Contact Us',
      ],
    },
    {
      title: 'Follow Us',
      links: ['Instagram', 'Twitter', 'Facebook', 'YouTube'],
    },
  ]

  return (
    <footer className='mt-20 sm:mt-24 md:mt-32 lg:mt-40 px-6 md:px-16 lg:px-24 xl:px-32 '>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30'>
        {/* Logo & Description */}
        <div>
          <h1 className={`${lobster.className} text-3xl text-[#046C4E]`}>
            PremiumCARS
          </h1>
          <p className='max-w-[410px] mt-6 text-sm leading-relaxed'>
            We are committed to providing you with the best possible experience
            while shopping for your dream car.
          </p>
        </div>

        {/* Link Sections */}
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
                {section.title}
              </h3>
              <ul className='text-sm space-y-1'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link href='#' className='hover:underline transition'>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Note */}
      <p className='py-4 text-center text-sm md:text-base '>
        Copyright 2025 © PremiumCARS All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
