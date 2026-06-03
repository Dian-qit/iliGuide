import { Star, Eye, Anchor, Footprints, Bike, Camera } from "lucide-react";

export const FEATURED_ACTIVITIES = [
  {
    icon: Eye,
    title: "Sightseeing",
    description:
      "Observe legendary dual waterfalls and monumental natural drop viewpoints nested deep within pristine landscapes.",
  },
  {
    icon: Anchor,
    title: "Boating & Rafting",
    description:
      "Ride traditional bamboo rafts across crystal pools directly under the refreshing spray of hidden curtains.",
  },
  {
    icon: Footprints,
    title: "Trekking & Hiking",
    description:
      "Conquer stone staircases down steep ravines and challenge rugged off-road terrains to remote overlooks.",
  },
  {
    icon: Bike,
    title: "Leisurely Cycling",
    description:
      "Enjoy crisp sea breezes with early morning or relaxing evening rides along scenic public coastal parks.",
  },
  {
    icon: Camera,
    title: "Landscape Photography",
    description:
      "Document high-contrast horizons, iconic city signages at sunset, and breathtaking geological wonders.",
  },
  {
    icon: Star,
    title: "Cold Spring Swimming",
    description:
      "Plunge into icy-cold, non-chlorinated volcanic spring pools constantly replenished by natural mountain streams.",
  },
];

const FeaturedActivityCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white border border-[#EBE8DF] p-4 hover:shadow-lg transition-transform hover:-translate-y-1 duration-300">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-12 h-12 bg-[#FAF9F6] border border-[#EBE8DF] rounded-full flex items-center justify-center ">
        <Icon className="w-5 h-5 text-[#16A34A]" />
      </div>
      <h4 className="text-lg font-medium text-[#1C2421]">{title}</h4>
    </div>
    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

export default FeaturedActivityCard;
