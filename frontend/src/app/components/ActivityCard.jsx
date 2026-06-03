import { Bike, Waves, Eye, Camera, MountainSnow, Ship } from "lucide-react";

const ACTIVITY_ICONS = {
  Cycling: Bike,
  Swimming: Waves,
  Sightseeing: Eye,
  Photography: Camera,
  Hiking: MountainSnow,
  Boating: Ship,
};

const ActivityCard = ({ activity }) => {
  const Icon = ACTIVITY_ICONS[activity.ActivityName] ?? Eye;

  return (
    <div className="flex items-center gap-2  w-80">
      <div className="bg-green-100 text-green-700 p-3 rounded-full">
        <Icon className="size-6" />
      </div>
      <div>
        <p className="font-semibold text-sm">{activity.ActivityName}</p>
        <p className="text-xs text-gray-500 ">{activity.ActivityDescription}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
