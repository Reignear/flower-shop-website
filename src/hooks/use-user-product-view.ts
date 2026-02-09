import { useState } from "react";

export const useUserProductView = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  return { imgLoaded, setImgLoaded, quantity, setQuantity };
};
