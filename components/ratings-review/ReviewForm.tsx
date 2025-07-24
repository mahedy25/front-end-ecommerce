'use client'

import { useState } from 'react'

type Props = {
  onSubmit: (rating: number, comment: string) => void
}

export default function ReviewForm({ onSubmit }: Props) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (!comment.trim() || rating === 0) return
    onSubmit(rating, comment.trim())
    setRating(0)
    setComment('')
  }

  return (
    <div className="mb-8">
      <p className="font-medium mb-2">Leave a review:</p>
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => setRating(value)}
            className={`text-xl ${
              value <= rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        placeholder="Write your comment..."
        className="w-full border rounded p-2 text-sm resize-none"
        rows={3}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />

      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
      >
        Submit
      </button>
    </div>
  )
}
