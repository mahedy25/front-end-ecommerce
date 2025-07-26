import AllOrders from "@/components/Seller/AllOrders";

export default function AllOrdersPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-[#046C4E] mb-2">All Orders</h2>
      <p className="text-gray-600">Check and manage all your orders.</p>
      <AllOrders />
    </div>
  )
}
