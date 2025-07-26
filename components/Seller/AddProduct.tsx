'use client'

import { useState } from 'react'
import { ImagePlus, DollarSign, Tags, FileText } from 'lucide-react'
import Image from 'next/image'

export default function AddProductForm() {
  const [images, setImages] = useState<File[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0]
    if (!file) return
    const updatedImages = [...images]
    updatedImages[index] = file
    setImages(updatedImages)
  }

  return (
    <div className="py-10 flex justify-center bg-white w-full">
      <form className="w-full max-w-xl p-6 space-y-6 rounded-lg shadow-md border border-gray-200">
        {/* Product Images */}
        <div>
          <label className="text-base font-semibold flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-blue-900" />
            Product Images
          </label>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {Array(4).fill('').map((_, index) => (
              <label
                key={index}
                htmlFor={`image-${index}`}
                className="cursor-pointer border border-dashed border-gray-400 rounded-md p-2 hover:border-blue-900 transition"
              >
                <input
                  type="file"
                  accept="image/*"
                  id={`image-${index}`}
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />
                <Image
                  width={96}
                  height={96}
                  src={
                    images[index]
                      ? URL.createObjectURL(images[index])
                      : '/upload.png'
                  }
                  alt="upload"
                  className="w-24 h-24 object-cover rounded-md"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="product-name" className="text-base font-semibold flex items-center gap-2">
            <Tags className="w-5 h-5 text-blue-900" />
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-900"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="product-description" className="text-base font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-900" />
            Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Describe your product"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none outline-none focus:ring-2 focus:ring-blue-900"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="text-base font-semibold">
            Category
          </label>
          <select
            id="category"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="">Select Category</option>
            {['Electronics', 'Clothing', 'Accessories'].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price and Offer Price */}
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[120px]">
            <label htmlFor="price" className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-900" />
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="0"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label htmlFor="offer-price" className="text-base font-semibold">
              Offer Price
            </label>
            <input
              type="number"
              id="offer-price"
              placeholder="0"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-blue-900 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-md transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}
