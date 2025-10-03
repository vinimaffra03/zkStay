import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ListingCard({ listing, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/info/${listing.id}`);
  };

  return (
    <div
      className="flex-shrink-0 w-72 group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative rounded-xl overflow-hidden mb-3">
        <img
          src={listing.image}
          alt={listing.type}
          className="w-full h-72 object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(listing.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-white/90 transition-colors"
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite
                ? "fill-red-500 stroke-red-500"
                : "fill-black/50 stroke-white"
            }`}
          />
        </button>
        <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-medium">
          Guest favorite
        </div>
      </div>
      <div className="px-1">
        <div className="flex justify-between items-start mb-1">
          <p className="font-medium text-gray-900">{listing.type}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-black" />
            <span className="text-sm">{listing.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-1">2 nights</p>
        <p className="text-gray-900">
          <span className="font-semibold">{listing.price}</span> for 2 nights
        </p>
      </div>
    </div>
  );
}
