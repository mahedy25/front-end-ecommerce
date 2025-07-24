'use client'

type Props = {
  average: number
  total: number
}

export default function RatingStats({ average, total }: Props) {
  return (
    <div className="mb-4">
      <p className="text-sm text-gray-600">Average Rating:</p>
      <div className="flex items-center gap-2">
        <p className="text-3xl font-bold text-yellow-500">{average.toFixed(1)}</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 18 17" fill="none">
              <path
                d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                fill={i <= average ? '#f59e0b' : '#e5e7eb'}
              />
            </svg>
          ))}
        </div>
        <span className="text-sm text-gray-500">({total} ratings)</span>
      </div>
    </div>
  )
}
