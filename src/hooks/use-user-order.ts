import type { Status } from "@/utils/types";
import { useState } from "react";

export const useUserOrder = () => {
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  return {
    filterStatus,
    setFilterStatus,
    imgLoaded,
    setImgLoaded,
  };
};
