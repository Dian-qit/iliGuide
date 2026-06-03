import React from "react";
import { Link } from "react-router";
import { MapPin } from "lucide-react";

const TouristSpotCard = ({ spot }) => {
  const id = spot._id || spot.DestinationID || spot.id;
  return (
    <Link
      to={`/tourist-spots/${id}`}
      className="group relative z-10card w-100 shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
    >
      <figure>
        <img
          src={spot.ImageURL}
          alt={spot.Name}
          className="w-full h-70 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </figure>
      <div className="h-1x">
        <div className="card-body bg-white px-4 py-5">
          <h2 className="card-title font-medium text-2xl line-clamp-1">{spot.Name}</h2>
          
          {/* Updated this paragraph tag below */}
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {spot.Description}
          </p>

          <div className="flex items-center mt-4 text-gray-600">
            <MapPin />
            <p className="text-xs">{spot.Address}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TouristSpotCard;