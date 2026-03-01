import { useState } from "react";

export const useAdminFeedbackOrder = () => {
  const [filter, setFilter] = useState("all");
  return { filter, setFilter };
};
