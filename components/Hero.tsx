'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { slides } from '@/lib/sliders' // Adjust path as needed

export default function Hero() {
  return (
    <>
      <section className='mt-5 relative w-full h-[75vh] md:h-[85vh] overflow-hidden'>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className='w-full h-full'
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className='relative w-full h-full'>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout='fill'
                  objectFit='cover'
                  className='brightness-[0.9]'
                  priority
                />
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className='absolute top-1/2 left-6 md:left-16 lg:left-24 transform -translate-y-1/2 z-10 max-w-[90%] md:max-w-xl text-white'
                >
                  <h2 className='text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg'>
                    {slide.title}
                  </h2>
                  <p className='text-sm sm:text-base md:text-lg mb-6 max-w-md text-white/90 drop-shadow'>
                    {slide.description}
                  </p>
                  <Link href={slide.link}>
                    <button className='bg-[#046C4E] hover:bg-[#6F42C1] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition'>
                      {slide.cta}
                    </button>
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 👇 Hide Swiper arrows on small screens */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
