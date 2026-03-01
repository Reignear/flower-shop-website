import { useState } from "react";

export const useAdminFeedbackProduct = () => {
  const [filter, setFilter] = useState("all");
  return { filter, setFilter };
};
