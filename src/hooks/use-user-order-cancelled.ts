import { useState } from "react";

export const useUserOrderCancelled = () => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  return {
    imgLoaded,
    setImgLoaded,
  };
};
