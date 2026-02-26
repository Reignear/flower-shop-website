import { useState } from "react";

export const useAdminOrderDeclined = () => {
  const [activeLayout, setActiveLayout] = useState<"grid" | "table">("grid");
  return { activeLayout, setActiveLayout };
};
