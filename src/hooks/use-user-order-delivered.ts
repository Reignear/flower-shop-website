import { useState } from "react";

export const useUserOrderDelivered = () => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return { imgLoaded, setImgLoaded };
};
