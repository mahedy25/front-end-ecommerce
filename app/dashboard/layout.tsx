
import SellerSidebar from '@/components/Seller/SellerSIdebar'
import '../globals.css'
import SellerTopbar from '@/components/Seller/SellerTopbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SellerSidebar />

      <div className="flex-1 flex flex-col">
        <SellerTopbar />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
