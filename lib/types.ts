export type Product = {
  id: string
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

export type Address = {
  name: string
  fullAddress: string
  city: string
  state: string
  countryCode: string
  phone: string
}

export type CartItem = Product & { quantity: number }

export type Order = {
  id: string
  items: CartItem[]
  address: Address
  amount: number
  paymentType: string
  orderDate: string
  isPaid: boolean
}
