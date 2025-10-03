import { SectionNavigation } from "./SectionNavigation.jsx";
import { ListingCard } from "./ListingCard.jsx";

export function ListingsSection({
  title,
  listings,
  favorites,
  onToggleFavorite,
}) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <SectionNavigation />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            isFavorite={favorites[listing.id]}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
