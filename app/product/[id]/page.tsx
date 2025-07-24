// app/product/[id]/page.tsx
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'
import { products } from '@/lib/dummyProducts'

// 🟢 Update this:
type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return { title: product.title }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) return notFound()
  return <ProductDetails product={product} />
}
