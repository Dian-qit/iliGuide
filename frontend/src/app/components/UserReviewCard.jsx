import { useState } from "react";
import { Star, Trash2, Edit2, MapPin } from "lucide-react";
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

const DeleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Blurred backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    />

    {/* Modal */}
    <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center gap-5">
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
        <Trash2 className="size-6 text-red-500" />
      </div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Delete Review
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Are you sure you want to delete this review? This action cannot be
          undone.
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 px-4 rounded-xl border-2 border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const UserReviewCard = ({ review, onDelete }) => {
  const [editingReview, setEditingReview] = useState(null);
  const [currentReview, setCurrentReview] = useState(review);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const spotName =
    currentReview.SpotName ||
    currentReview.DestinationName ||
    currentReview.Name;
  const spotLocation = [currentReview.Address, currentReview.Location]
    .filter(Boolean)
    .join(", ");
  const spotImageUrl =
    currentReview.ImageURL || currentReview.imageURL || currentReview.Image;

  const formattedDate = new Date(currentReview.ReviewDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const handleDelete = async () => {
    try {
      await api.delete(`/reviews/${currentReview.ReviewID}`);
      onDelete(currentReview.ReviewID);
    } catch (err) {
      console.error("Error deleting review:", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleReviewUpdated = (updated) => {
    setCurrentReview(updated);
    setEditingReview(null);
  };

  const handleCardClick = () => {
    if (currentReview.DestinationID) {
      window.location.href = `/tourist-spots/${currentReview.DestinationID}`;
    }
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      <div
        onClick={handleCardClick}
        className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 min-h-80 relative cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
      >
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditingReview(currentReview);
            }}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
            title="Edit review"
          >
            <Edit2 className="size-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
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
                alt={spotName ? `${spotName} image` : "Reviewed destination image"}
                className="w-full h-40 rounded-xl object-cover md:h-32 md:w-32"
              />
            )}
            <div>
              {spotName && (
                <p className="text-lg font-semibold text-gray-900">{spotName}</p>
              )}
              {spotLocation && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="size-3 text-[#16A34A]" />
                  <p className="text-sm text-gray-500">{spotLocation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <StarRating rating={currentReview.Rating} />

        {currentReview.Comment && (
          <p className="text-gray-600 text-md font-medium leading-relaxed my-2">
            "{currentReview.Comment}"
          </p>
        )}

        {!spotName && currentReview.DestinationName && (
          <div className="mt-auto pt-4 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700">
              {currentReview.DestinationName}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">{formattedDate}</p>
          {currentReview.DestinationID && (
            <span className="text-xs text-[#16A34A] font-medium tracking-wide">
              View Spot →
            </span>
          )}
        </div>
      </div>

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