import { Link } from "react-router";
import { MapPin, Ticket, Star } from "lucide-react";

const TouristSpotCard = ({ spot }) => {
  const id = spot._id || spot.DestinationID || spot.id;
  const isFree = parseFloat(spot.EntranceFee) === 0;

  // Gracefully grab rating properties regardless of casing from database payload
  const spotRating = spot.Rating || spot.AverageRating || spot.rating;
  const formattedRating = spotRating ? parseFloat(spotRating).toFixed(1) : null;

  return (
    <Link
      to={`/tourist-spots/${id}`}
      className="group relative z-10 card w-100 shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
    >
      {/* ── Image with Badge Stack ── */}
      <figure className="relative">
        <img
          src={spot.ImageURL}
          alt={spot.Name}
          className="w-full h-70 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        
        {/* Upper Right Control Grid */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          
          {/* 1. Rating Badge (Only shows if valid rating data exists) */}
          {formattedRating && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm">
              <Star className="size-3 fill-white text-white" />
              <span>{formattedRating}</span>
            </div>
          )}

          {/* 2. Fee Badge */}
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-sm shadow-sm ${
            isFree
              ? "bg-[#006c46]/80 text-white"
              : "bg-[#16A34A]/80 text-white"
          }`}>
            <Ticket className="size-3" />
            {isFree ? "Free" : `₱${parseFloat(spot.EntranceFee).toFixed(0)}`}
          </div>
          
        </div>
      </figure>

      {/* ── Card Body ── */}
      <div className="card-body bg-white px-4 py-5">
        <h2 className="card-title font-medium text-black text-2xl line-clamp-1">
          {spot.Name}
        </h2>
        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {spot.Description}
        </p>
        <div className="flex items-center mt-4 text-gray-600">
          <MapPin className="size-4 shrink-0" />
          <p className="text-xs ml-1">{spot.Address}</p>
        </div>
      </div>
    </Link>
  );
};

export default TouristSpotCard;