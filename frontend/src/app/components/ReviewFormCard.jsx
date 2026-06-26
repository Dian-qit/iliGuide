import { useState } from 'react'
import { X, Star } from 'lucide-react'
import { Link } from 'react-router'
import api from '../lib/axios.js'
import { useAuthContext } from '../hooks/useAuthContext'

const RATING_LABELS = {
  5: 'Very Good Experience',
  4: 'Excellent',
  3: 'Comfortable',
  2: 'Lacks Service',
  1: 'Bad Experience',
}

const ReviewFormCard = ({ spotId, spotName, onClose, onReviewSubmitted }) => {
  const [rating, setRating]         = useState(5)
  const [comment, setComment]       = useState('')
  const [hoveredStar, setHoveredStar] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await api.post('/reviews', {
        destinationId: Number(spotId),
        rating,
        comment,
      })
      onReviewSubmitted()
      onClose()
    } catch (err) {
      setError('Failed to submit review. Please try again.')
      console.error('Error submitting review:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const { user } = useAuthContext()

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-fade-in">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Submit Your Review</h2>
          <p className="text-sm text-gray-500 mt-1">Share your experience at <span className="font-medium text-green-700">{spotName}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* User Info Section */}
          {user ? (
            <div>
              <label className="text-[10px] uppercase text-gray-400 block mb-2 tracking-wide">Reviewer</label>
              <p className="text-sm font-medium text-gray-800">{user?.Name || user?.name || user?.email || 'User'}</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Please log in to submit a review</p>
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="flex-1 text-center bg-[#1C2421] hover:bg-[#16A34A] text-white tracking-widest text-[10px] uppercase px-4 py-2.5 rounded-lg transition-colors duration-300 font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 text-center bg-gray-300 hover:bg-gray-400 text-gray-800 tracking-widest text-[10px] uppercase px-4 py-2.5 rounded-lg transition-colors duration-300 font-bold"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          {/* Star Rating */}
          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-2 tracking-wide">Rating</label>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                  >
                    <Star
                      className={`size-7 transition-colors ${
                        star <= (hoveredStar ?? rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-1">
                {RATING_LABELS[hoveredStar ?? rating]}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-1 tracking-wide">Your Review</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience here..."
              className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 text-gray-800 resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !user}
            className="w-full bg-[#1C2421] hover:bg-[#16A34A] disabled:opacity-50 disabled:cursor-not-allowed text-white tracking-widest text-[10px] uppercase px-6 py-3 rounded-lg transition-colors duration-300 font-bold"
          >
            {submitting ? 'Submitting...' : 'Post Review'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default ReviewFormCard
