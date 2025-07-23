'use client'

import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/dummyProducts'
import { useSearchParams } from 'next/navigation'
import { Lobster_Two } from 'next/font/google'

const lobster = Lobster_Two({ weight: '400', subsets: ['latin'] })

export default function AllProducts() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase().trim() || ''

  const allProducts = products.filter((product) =>
    product.instock.trim().toLowerCase() === 'true'
  )

  const filteredProducts = query
    ? allProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      )
    : allProducts

  return (
    <main className='mt-20 px-4 max-w-7xl mx-auto'>
      <h1
        className={`${lobster.className} text-3xl sm:text-4xl md:text-5xl text-center mb-6`}
      >
        {query ? `Search Results for "${query}"` : 'All Products'}
      </h1>

      {query && filteredProducts.length === 0 ? (
        <div className='text-center text-gray-600 mb-10'>
          <p className='text-lg font-medium mb-2'>
            No matching results found for &quot;<strong>{query}</strong>&quot;
          </p>
          <p className='text-sm mb-4'>Showing all available products instead.</p>
        </div>
      ) : null}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {(filteredProducts.length > 0 ? filteredProducts : allProducts).map(
          (product) => (
            <ProductCard key={product.id} product={product} />
          )
        )}
      </div>
    </main>
  )
}
