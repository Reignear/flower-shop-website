import { useState } from "react";

export const useAdminOrderAll = () => {
  const [activeLayout, setActiveLayout] = useState<"grid" | "table">("grid");
  return {
    activeLayout,
    setActiveLayout,
  };
};
