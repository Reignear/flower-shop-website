import { useState } from "react";

export const useUserCart = () => {
 const [imgLoaded, setImgLoaded] = useState(false);

  return {
    imgLoaded,
    setImgLoaded
  };
};
