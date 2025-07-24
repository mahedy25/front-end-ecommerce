'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ReviewSection from './ratings-review/ReviewSection'
import { products } from '@/lib/dummyProducts' // Adjust path
import ProductCard from './ProductCard' // Adjust path
import { Product } from '@/lib/types'
 // Adjust path

type Props = {
  product: Product
}

export default function ProductDetails({ product }: Props) {
  const [thumbnail, setThumbnail] = useState(product.image?.[0] ?? '')

  // Calculate average rating safely
  const average =
    product.ratings && product.ratings.length > 0
      ? product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length
      : 0

  // Filter related products safely
  const relatedProducts = Array.isArray(products)
    ? products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
    : []

  // Defensive split description
  const descriptionPoints: string[] =
    typeof product.description === 'string'
      ? product.description.split('.').map((p) => p.trim()).filter(Boolean)
      : []

  // Defensive image array
  const images: string[] = Array.isArray(product.image) ? product.image : []

  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 space-x-1">
          <Link href="/" className="hover:underline text-gray-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/all-products" className="hover:underline text-gray-500">
            All Products
          </Link>
          <span>/</span>
          <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:underline text-gray-500">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-indigo-600 font-medium">{product.title}</span>
        </p>

        <div className="mt-8 flex flex-col lg:flex-row gap-12">
          {/* Images */}
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-auto md:max-w-[96px]">
              {images.length > 0 ? (
                images.map((img: string, idx: number) => (
                  <div
                    key={`thumb-${idx}`}
                    onClick={() => setThumbnail(img)}
                    className={`border rounded-md overflow-hidden cursor-pointer w-24 h-24 flex-shrink-0 ${
                      thumbnail === img ? 'border-indigo-500' : 'border-gray-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={192}
                      height={192}
                      className="object-cover w-full h-full"
                      quality={100}
                      priority
                    />
                  </div>
                ))
              ) : (
                <div className="text-gray-400">No images available</div>
              )}
            </div>

            {/* Main Image */}
            <div className="flex-1 min-h-[300px] sm:min-h-[400px] border border-gray-200 rounded-md overflow-hidden relative">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={product.title}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">{product.title}</h1>

            {/* Rating below title */}
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 18 17"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                    fill={i <= average ? '#f59e0b' : '#e5e7eb'}
                  />
                </svg>
              ))}
              <span className="text-xs text-gray-500 ml-2">({product.ratings.length} ratings)</span>
            </div>

            {/* Pricing */}
            <div className="text-lg sm:text-xl font-medium mb-4">
              <span className="text-indigo-600">${product.offerPrice.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through ml-2">${product.price.toLocaleString()}</span>
            </div>

            <p className="text-sm text-gray-600 mb-6">(Inclusive of all taxes)</p>

            {/* Description */}
            <h2 className="text-base sm:text-lg font-semibold mb-2">About This Product</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 mb-8">
              {descriptionPoints.length > 0 ? (
                descriptionPoints.map((point: string, idx: number) => (
                  <li key={`desc-${idx}`}>{point}</li>
                ))
              ) : (
                <li>No description available.</li>
              )}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="w-full py-3 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 transition">
                Add to Cart
              </button>
              <button className="w-full py-3 rounded-md text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ReviewSection initialRatings={product.ratings} initialReviews={product.reviews || []} />

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
