'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/types'
 // Adjust the import path if needed

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [count, setCount] = React.useState(0)

  // Calculate average rating from ratings array
  const averageRating =
    product.ratings.length > 0
      ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length
      : 0

  return (
    <div className="w-full max-w-xs border border-[#046C4E]/20 rounded-md p-3 sm:p-4 bg-white flex flex-col">
      {/* Wrap image in Link */}
      <Link href={`/product/${product.id}`}>
        <div className="w-full aspect-[4/3] overflow-hidden rounded relative group">
          <Image
            src={product.image[0]}
            alt={product.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      </Link>

      <div className="mt-3 text-sm text-gray-600">
        <p className="text-[#046C4E]/80 uppercase tracking-wide">{product.category}</p>

        {/* Wrap title in Link */}
        <Link href={`/product/${product.id}`}>
          <h2 className="text-gray-900 font-semibold text-lg truncate hover:underline">
            {product.title}
          </h2>
        </Link>

        {/* Ratings */}
        <div className="flex items-center gap-1 mt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                fill={i <= averageRating ? '#046C4E' : '#046C4E40'}
              />
            </svg>
          ))}
        </div>

        <div className="flex justify-between items-end mt-4">
          <p className="text-[#046C4E] font-semibold text-base sm:text-lg">
            ${product.offerPrice.toLocaleString()}
            <span className="text-gray-400 line-through text-sm ml-1">
              ${product.price.toLocaleString()}
            </span>
          </p>

          {count === 0 ? (
            <button
              onClick={() => setCount(1)}
              className="flex cursor-pointer items-center gap-1 px-3 h-9 border border-[#046C4E] text-[#046C4E] bg-[#046C4E]/10 rounded-md text-sm font-medium hover:bg-[#046C4E]/20 transition"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 h-9 bg-[#046C4E]/10 text-[#046C4E] px-2 rounded-md select-none">
              <button onClick={() => setCount((p) => Math.max(p - 1, 0))} className="px-2">
                −
              </button>
              <span className="w-5 text-center">{count}</span>
              <button onClick={() => setCount((p) => p + 1)} className="px-2">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
