import { useState } from "react";
import type { Cart } from "@/utils/interface"; 
 
export const useUserCart = () => {
 const [imgLoaded, setImgLoaded] = useState(false);
  const [data, setData] = useState<Cart[]>([]);
  return {
    imgLoaded,
    setImgLoaded,
    data,
    setData
  };
};
