import { Lobster_Two } from 'next/font/google'
import ProductCard from './ProductCard'
import { products } from '@/lib/dummyProducts'

const lobster = Lobster_Two({ weight: '400', subsets: ['latin'] })

export default function BestSellers() {
  // Get only top 4 in-stock products
  const topInStockProducts = products
    .filter((product) => product.instock.trim().toLowerCase() === 'true')
    .slice(0, 4)

  return (
    <main className="mt-20 sm:mt-24 md:mt-32 lg:mt-40 px-4">
      <h1
        className={`${lobster.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-8`}
      >
        Best Sellers
      </h1>

      {topInStockProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {topInStockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">No popular in-stock products found.</p>
      )}
    </main>
  )
}
