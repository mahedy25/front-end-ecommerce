'use client'

type Review = {
  rating: number
  comment: string
}

type Props = {
  reviews: Review[]
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return <p className="text-sm text-gray-500">No reviews yet.</p>
  }

  return (
    <div className="space-y-4">
      {reviews.map((rev, idx) => (
        <div key={idx} className="border rounded p-4">
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: rev.rating }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <p className="text-sm mt-1 text-gray-700">{rev.comment}</p>
        </div>
      ))}
    </div>
  )
}
