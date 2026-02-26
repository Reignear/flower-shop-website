import { useState } from "react";

export const useAdminOrderForPickup = () => {
  const [activeLayout, setActiveLayout] = useState<"grid" | "table">("grid");
  return { activeLayout, setActiveLayout };
};
