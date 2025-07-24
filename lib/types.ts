export type Product = {
  id: string // or number, pick one consistently
  title: string
  price: number
  offerPrice: number
  description: string
  category: string
  image: string[]
  createdAt?: string
  updatedAt?: string
  instock: string
  ratings: number[]
  reviews?: { rating: number; comment: string }[]
}
