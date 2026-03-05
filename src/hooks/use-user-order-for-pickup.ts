import { useState } from "react";

export const useUserOrderForPickup = () => {
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  return {
    imgLoaded,
    setImgLoaded,
  };
};
