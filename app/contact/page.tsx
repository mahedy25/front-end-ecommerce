'use client'

import React from 'react'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

export default function Contact() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-10 py-12 max-w-5xl mx-auto">
      {/* Header */}
      <section className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#046C4E] mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions, need assistance, or just want to connect?  
          Our team is here to provide you with a premium customer experience.
        </p>
      </section>

      {/* Contact Info */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Email */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-[#046C4E]/20 hover:shadow-lg transition">
          <Mail className="mx-auto mb-4 text-[#046C4E]" size={32} />
          <h3 className="text-lg font-semibold text-[#046C4E] mb-2">Email Us</h3>
          <p className="text-gray-600">support@premiumcars.com</p>
          <p className="text-gray-600">sales@premiumcars.com</p>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-[#046C4E]/20 hover:shadow-lg transition">
          <Phone className="mx-auto mb-4 text-[#046C4E]" size={32} />
          <h3 className="text-lg font-semibold text-[#046C4E] mb-2">Call Us</h3>
          <p className="text-gray-600">+1 (555) 123-4567</p>
          <p className="text-gray-600">+1 (555) 987-6543</p>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center border border-[#046C4E]/20 hover:shadow-lg transition">
          <MapPin className="mx-auto mb-4 text-[#046C4E]" size={32} />
          <h3 className="text-lg font-semibold text-[#046C4E] mb-2">Visit Us</h3>
          <p className="text-gray-600">123 Luxury Drive</p>
          <p className="text-gray-600">Beverly Hills, CA 90210</p>
        </div>
      </section>

      {/* Social Media */}
      <section className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#046C4E] mb-6">Follow Us</h2>
        <div className="flex justify-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#046C4E]/10 hover:bg-[#046C4E] hover:text-white transition"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#046C4E]/10 hover:bg-[#046C4E] hover:text-white transition"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#046C4E]/10 hover:bg-[#046C4E] hover:text-white transition"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#046C4E]/10 hover:bg-[#046C4E] hover:text-white transition"
          >
            <Youtube size={24} />
          </a>
        </div>
      </section>
    </main>
  )
}
