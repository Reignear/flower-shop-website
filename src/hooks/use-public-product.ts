import type { Category } from "@/utils/interface";
import { useState } from "react";

export const usePublicProduct = () => {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  return { activeCategory, setActiveCategory };
};
