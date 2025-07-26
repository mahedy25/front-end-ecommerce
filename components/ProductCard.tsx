'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/lib/types'
import { useAppContext } from '@/app/context/AppContext'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useAppContext() // Access the addToCart function from context
  const [] = React.useState(1) // Default count is 1

  // Calculate average rating from ratings array
  const averageRating =
    product.ratings.length > 0
      ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length
      : 0

  const handleAddToCart = () => {
    addToCart(product) // Add product with quantity to the cart
  }

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
            <Star
              key={i}
              size={14}
              fill={i <= averageRating ? '#046C4E' : '#046C4E40'}
            />
          ))}
        </div>

        <div className="flex justify-between items-end mt-4">
          <p className="text-[#046C4E] font-semibold text-base sm:text-lg">
            ${product.offerPrice.toLocaleString()}
            <span className="text-gray-400 line-through text-sm ml-1">
              ${product.price.toLocaleString()}
            </span>
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex cursor-pointer items-center gap-1 px-3 h-9 border border-[#046C4E] text-[#046C4E] bg-[#046C4E]/10 rounded-md text-sm font-medium hover:bg-[#046C4E]/20 transition"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
