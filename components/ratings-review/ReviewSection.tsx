'use client'

import { useState } from 'react'
import RatingStats from './RatingStats'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

type Review = {
  rating: number
  comment: string
}

type Props = {
  initialRatings: number[]
  initialReviews: Review[]
}

export default function ReviewSection({ initialRatings, initialReviews }: Props) {
  const [ratings, setRatings] = useState(initialRatings)
  const [reviews, setReviews] = useState(initialReviews)

  const average =
    ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0

  const handleNewReview = (rating: number, comment: string) => {
    setRatings((prev) => [...prev, rating])
    setReviews((prev) => [{ rating, comment }, ...prev])
  }

  return (
    <div className="mt-20 border-t pt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>
      <RatingStats average={average} total={ratings.length} />
      <ReviewForm onSubmit={handleNewReview} />
      <ReviewList reviews={reviews} />
    </div>
  )
}
