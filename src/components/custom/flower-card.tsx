import type { Flower } from "@/utils/interface";

interface FlowerCardProps {
  data: Flower;
  width?: string;
  height?: string;
}
const FlowerCard = ({ data, width, height }: FlowerCardProps) => {
  return (
    <div
      key={data.id}
      className={`bg-card gap-1 rounded-lg border shadow-sm ${width} ${height}`}
    >
      <img
        src={data.imageUrl}
        alt={data.name}
        className="h-full w-full object-cover rounded-lg shadow-sm"
      />
    </div>
  );
};

export default FlowerCard;
