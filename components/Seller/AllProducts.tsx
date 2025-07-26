'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trash } from 'lucide-react';
import clsx from 'clsx';
import { Product } from '@/lib/dummyProducts';

interface Props {
  initialProducts: Product[];
}

export default function AllProducts({ initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const toggleInStock = (id: string) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, instock: product.instock === 'true' ? 'false' : 'true' }
          : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return (
    <div className="flex-1 p-4 md:p-10">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
        All Products
      </h2>

      {/* Make table scrollable on small screens */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-[800px] w-full text-sm md:text-base text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Offer</th>
              <th className="px-4 py-3 font-medium">In Stock</th>
              <th className="px-4 py-3 font-medium text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-gray-700">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 flex items-center gap-3 max-w-[200px]">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 border rounded overflow-hidden shrink-0">
                    <Image
                      src={product.image[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium text-sm sm:text-base line-clamp-1">{product.title}</span>
                </td>

                <td className="px-4 py-4">{product.category}</td>
                <td className="px-4 py-4">${product.price.toLocaleString()}</td>
                <td className="px-4 py-4">${product.offerPrice.toLocaleString()}</td>

                <td className="px-4 py-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={product.instock === 'true'}
                      onChange={() => toggleInStock(product.id)}
                    />
                    <div
                      className={clsx(
                        'w-11 h-6 rounded-full transition-colors',
                        product.instock === 'true' ? 'bg-green-500' : 'bg-gray-300'
                      )}
                    />
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                  </label>
                </td>

                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete Product"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500 text-sm">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
