import { Star } from "lucide-react";

// HMR test comment
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

const ReviewCard = ({ review }) => {
  const formattedDate = new Date(review.ReviewDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className=" justify-center bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 min-h-80">
      <StarRating rating={review.Rating} />

      {review.Comment && (
        <p className="text-gray-600 text-md font-mediumleading-relaxed my-2">
          " {review.Comment} "
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-700 font-bold rounded-full size-10 flex items-center justify-center text-sm uppercase">
            {review.TouristName?.charAt(0) ?? "?"}
          </div>
          <div>
            <p className="font-semibold text-sm">{review.TouristName}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
