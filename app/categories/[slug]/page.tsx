import { categories } from '@/lib/categories'
import { products } from '@/lib/dummyProducts'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { Lobster_Two } from 'next/font/google'

const lobster = Lobster_Two({ weight: '400', subsets: ['latin'] })

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const category = categories.find(cat => cat.path === slug)

  if (!category) return notFound()

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category.path.toLowerCase()
  )

  return (
    <main className="mt-20 text-center px-4">
      <h1 className={`${lobster.className} text-4xl font-bold mb-4`}>{category.text}</h1>

      <p className={`${lobster.className} mt-4 text-xl`}>Showing cars for {category.text}</p>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-gray-500 text-lg">No cars available for this brand.</p>
      )}
    </main>
  )
}
