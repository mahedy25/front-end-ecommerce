import AddProduct from "@/components/Seller/AddProduct";

export default function AddProductPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#046C4E] mb-2">Add New Product</h2>
      <p className="text-gray-600">Use this form to add products to your store.</p>
      <AddProduct />
    </div>
  )
}
