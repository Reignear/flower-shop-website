import { useState } from "react";

export const useOrderPending = () => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  return {
    imgLoaded,
    setImgLoaded,
  };
};
