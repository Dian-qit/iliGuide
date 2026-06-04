import { useState } from "react";
import { Star, Trash2, Edit2 } from "lucide-react";
import api from "../lib/axios.js";
import EditReviewCard from "./EditReviewCard";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`size-4 ${i < rating ? "fill-green-700 text-green-700" : "fill-gray-200 text-gray-200"}`}
      />
    ))}
  </div>
);

const UserReviewCard = ({ review, onDelete, onEdit }) => {
  const [editingReview, setEditingReview] = useState(null);
  const [currentReview, setCurrentReview] = useState(review);
  const spotName =
    currentReview.SpotName ||
    currentReview.DestinationName ||
    currentReview.Name;
  const spotLocation = [
    currentReview.Address,
    currentReview.Location,
  ]
    .filter(Boolean)
    .join(", ");
  const spotImageUrl =
    currentReview.ImageURL || currentReview.imageURL || currentReview.Image;

  const formattedDate = new Date(currentReview.ReviewDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await api.delete(`/reviews/${currentReview.ReviewID}`);
        onDelete(currentReview.ReviewID);
      } catch (err) {
        console.error("Error deleting review:", err);
        alert("Failed to delete review");
      }
    }
  };

  const handleReviewUpdated = (updated) => {
    setCurrentReview(updated);
    setEditingReview(null);
  };

  return (
    <>
      

      <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 min-h-80 relative">
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setEditingReview(currentReview)}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
            title="Edit review"
          >
            <Edit2 className="size-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
            title="Delete review"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        {(spotImageUrl || spotName || spotLocation) && (
          <div className="grid gap-3 md:grid-cols-[auto_1fr] items-center border-b border-gray-200 pb-4">
            {spotImageUrl && (
              <img
                src={spotImageUrl}
                alt={
                  spotName ? `${spotName} image` : "Reviewed destination image"
                }
                className="w-full h-40 rounded-xl object-cover md:h-32 md:w-32"
              />
            )}
            <div>
              {spotName && (
                <p className="text-lg font-semibold text-gray-900">
                  {spotName}
                </p>
              )}
              {spotLocation && (
                <p className="text-sm text-gray-500 mt-1">{spotLocation}</p>
              )}
            </div>
          </div>
        )}

        {/* Rating */}
        <StarRating rating={currentReview.Rating} />

        {/* Comment */}
        {currentReview.Comment && (
          <p className="text-gray-600 text-md font-medium leading-relaxed my-2">
            "{currentReview.Comment}"
          </p>
        )}

        {/* Destination Info (if available) */}
        {!spotName && currentReview.DestinationName && (
          <div className="mt-auto pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              {currentReview.DestinationName}
            </p>
          </div>
        )}

        {/* Footer - Date */}
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <EditReviewCard
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onReviewUpdated={handleReviewUpdated}
        />
      )}
    </>
  );
};

export default UserReviewCard;
