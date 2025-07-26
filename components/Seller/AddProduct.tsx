'use client'

import { useState } from 'react'
import { ImagePlus, DollarSign, Tags, FileText } from 'lucide-react'
import Image from 'next/image'

export default function AddProductForm() {
  const [images, setImages] = useState<File[]>([])

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0]
    if (!file) return
    const updatedImages = [...images]
    updatedImages[index] = file
    setImages(updatedImages)
  }

  return (
    <div className="py-10 flex justify-center bg-white w-full">
      <form className="w-full max-w-xl p-6 space-y-6 rounded-xl shadow-lg border border-gray-200">
        {/* Product Images */}
        <div>
          <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-[#046C4E]" />
            Product Images
          </label>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {Array(4)
              .fill('')
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image-${index}`}
                  className="cursor-pointer border border-dashed border-gray-300 rounded-md p-2 hover:border-[#046C4E] transition"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id={`image-${index}`}
                    hidden
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <div className="w-24 h-24 flex items-center justify-center rounded-md overflow-hidden bg-white">
                    {images[index] ? (
                      <Image
                        width={96}
                        height={96}
                        src={URL.createObjectURL(images[index])}
                        alt="uploaded"
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <Image
                        width={40}
                        height={40}
                        src="/images/upload.png"
                        alt="upload icon"
                        className="object-contain w-10 h-10 opacity-70"
                      />
                    )}
                  </div>
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label
            htmlFor="product-name"
            className="text-lg font-semibold text-gray-800 flex items-center gap-2"
          >
            <Tags className="w-5 h-5 text-[#046C4E]" />
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#046C4E] text-sm text-gray-900"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="product-description"
            className="text-lg font-semibold text-gray-800 flex items-center gap-2"
          >
            <FileText className="w-5 h-5 text-[#046C4E]" />
            Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Describe your product"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none outline-none focus:ring-2 focus:ring-[#046C4E] text-sm text-gray-900"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="text-lg font-semibold text-gray-800"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#046C4E] text-sm text-gray-900"
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
            <label
              htmlFor="price"
              className="text-lg font-semibold text-gray-800 flex items-center gap-2"
            >
              <DollarSign className="w-5 h-5 text-[#046C4E]" />
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="0"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#046C4E] text-sm text-gray-900"
              required
            />
          </div>
          <div className="flex-1 min-w-[120px]">
            <label
              htmlFor="offer-price"
              className="text-lg font-semibold text-gray-800"
            >
              Offer Price
            </label>
            <input
              type="number"
              id="offer-price"
              placeholder="0"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#046C4E] text-sm text-gray-900"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#046C4E] hover:bg-[#035C42] text-white cursor-pointer text-sm font-semibold px-6 py-2 rounded-md transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}
