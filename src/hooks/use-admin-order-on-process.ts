import { useState } from "react";

export const useAdminOrderOnProcess = () => {
  const [activeLayout, setActiveLayout] = useState<"grid" | "table">("grid");
  return { activeLayout, setActiveLayout };
};
