import { useState } from "react";

export const useAdminOrderDelivered = () => {
  const [activeLayout, setActiveLayout] = useState<"grid" | "table">("grid");
  return { activeLayout , setActiveLayout};
};
