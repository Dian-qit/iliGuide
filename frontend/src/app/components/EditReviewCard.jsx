import { useState } from 'react'
import { X, Star } from 'lucide-react'
import api from '../lib/axios.js'

const RATING_LABELS = {
  5: 'Very Good Experience',
  4: 'Excellent',
  3: 'Comfortable',
  2: 'Lacks Service',
  1: 'Bad Experience',
}

const EditReviewCard = ({ review, onClose, onReviewUpdated }) => {
  const [rating, setRating] = useState(review.Rating)
  const [comment, setComment] = useState(review.Comment || '')
  const [hoveredStar, setHoveredStar] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await api.put(`/reviews/${review.ReviewID}`, {
        rating,
        comment,
      })
      onReviewUpdated({ ...review, Rating: rating, Comment: comment })
      onClose()
    } catch (err) {
      setError('Failed to update review. Please try again.')
      console.error('Error updating review:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-fade-in">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Editing review</p>
          <h2 className="text-2xl font-bold text-gray-800">Update your review</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

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

          <div>
            <label className="text-[10px] uppercase text-gray-400 block mb-1 tracking-wide">Your review</label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your experience here..."
              className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-green-600 text-gray-800 resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#1C2421] hover:bg-[#16A34A] disabled:opacity-50 disabled:cursor-not-allowed text-white tracking-widest text-[10px] uppercase px-6 py-3 rounded-lg transition-colors duration-300 font-bold"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditReviewCard