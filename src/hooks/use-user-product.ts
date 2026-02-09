import { useState } from "react";

export const useUserProduct = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [imageLoaded, setImageLoaded] = useState(false);
  return {
    activeCategory,
    setActiveCategory,
    imageLoaded,
    setImageLoaded,
  };
};
