'use client'

import React from 'react'
import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-10 py-12 max-w-7xl mx-auto">
      {/* Page Header */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#046C4E] mb-4">
          About Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Welcome to <span className="font-semibold text-[#046C4E]">PremiumCARS</span> —
          your trusted destination for hand-picked, high-performance vehicles that combine
          elegance, power, and precision.
        </p>
      </section>

      {/* Our Story */}
      <section className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <Image
            src="/images/aboutUs.jpg"
            alt="Luxury car showcase"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#046C4E] mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Born from a passion for automotive excellence, PremiumCARS was founded on a simple belief:
            <span className="font-semibold"> luxury should be genuine and accessible.</span>  
            Every car in our inventory is hand-selected to ensure it delivers both exhilarating performance
            and timeless elegance.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From the roar of a Mercedes-AMG engine to the sleek design of a Porsche, our cars
            are more than machines — they are experiences waiting to be driven.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#046C4E] mb-8 text-center">
          Why Choose Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Hand-Selected Inventory',
              desc: 'Only the finest vehicles, chosen for quality and performance.',
            },
            {
              title: 'Transparent Pricing',
              desc: 'No hidden fees — what you see is what you get.',
            },
            {
              title: 'Personalized Support',
              desc: 'A concierge-level experience at every stage of your journey.',
            },
            {
              title: 'Secure Nationwide Delivery',
              desc: 'Your dream car, delivered safely and on time.',
            },
            {
              title: 'Passionate Community',
              desc: 'Join a network of like-minded automotive enthusiasts.',
            },
            {
              title: 'Driven by Vision',
              desc: 'We aim to redefine luxury car shopping online.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-6 shadow-md border border-[#046C4E]/20 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-[#046C4E] mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#046C4E] text-white rounded-lg p-10 text-center shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready to Drive Your Dream Car?
        </h2>
        <p className="mb-6 text-white/90 max-w-2xl mx-auto">
          Explore our exclusive collection and experience the perfect blend of elegance,
          performance, and trust.
        </p>
        <a
          href="/all-products"
          className="bg-white text-[#046C4E] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Browse Collection
        </a>
      </section>
    </main>
  )
}
