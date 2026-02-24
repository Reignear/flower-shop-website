import { OrbitProgress } from "react-loading-indicators";
import Skeleton from "react-loading-skeleton";

interface CustomSkeletonProps {
  key?: number | string;
  type:
    | "order-card"
    | "product-card"
    | "cart-card"
    | "status-badge"
    | "photo-full"
    | "photo-icon"
    | "description-text"
    | "small-text"
    | "large-text"
    | "feedback-card";
  length?: number;
  width?: number | string;
  height?: number | string;
  size?: "small" | "medium" | "large";
}

export default function CustomSkeleton({
  key,
  type,
  width,
  height,
}: CustomSkeletonProps) {
  switch (type) {
    case "order-card":
      return (
        <div
          key={key}
          className="bg-gray-200 w-full h-80 rounded-lg skeleton-effect"
        >
          <Skeleton width={width || "100%"} height={height || 80} />
        </div>
      );
    case "product-card":
      return (
        <div
          key={key}
          className="bg-gray-200 w-full h-80 rounded-lg skeleton-effect"
        >
          <Skeleton width={width || "100%"} height={height || 80} />
        </div>
      );

    case "cart-card":
      return <div></div>;
    case "status-badge":
      return (
        <div
          className="bg-gray-200 h-8 rounded-lg skeleton-effect "
          style={width ? { width: `${width}rem` } : { width: "10rem" }}
        >
          <Skeleton />
        </div>
      );
    case "photo-full":
      return (
        <OrbitProgress variant="spokes" dense color="#b2b2b2" size="medium" />
      );
    case "photo-icon":
      return <div></div>;
    case "description-text":
      return (
        <div
          className="bg-gray-200  rounded-lg skeleton-effect"
          style={{
            width: width ? `${width}rem` : "100%",
            height: height ? `${height}rem` : "100px",
          }}
        >
          <Skeleton width="100%" height={96} />
        </div>
      );
    case "small-text":
      return (
        <div
          className="bg-gray-200 w-25 h-7 rounded-lg skeleton-effect "
          style={width ? { width: `${width}rem` } : { width: "10rem" }}
        >
          <Skeleton />
        </div>
      );
    case "large-text":
      return (
        <div
          className="bg-gray-200 h-9 rounded-lg skeleton-effect "
          style={width ? { width: `${width}rem` } : { width: "18rem" }}
        >
          <Skeleton />
        </div>
      );
    case "feedback-card":
      return (
        <div className="bg-gray-200 w-full h-80 rounded-lg skeleton-effect">
          <Skeleton />
        </div>
      );
    default:
      return <div></div>;
  }
}
