import AllProducts from "@/components/Seller/AllProducts";
import { products } from "@/lib/dummyProducts";

export default function ProductListPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#046C4E] mb-2">Product List</h2>
      <p className="text-gray-600">All your products appear here.</p>
       <AllProducts initialProducts={products} />
    </div>
  )
}
