import { useState } from "react";

export const useAdminOrderPending = () => {
  const [activeLayout, setActiveLayout] = useState<"grid" | "table">("grid");
  return {
    activeLayout,
    setActiveLayout,
  };
};
