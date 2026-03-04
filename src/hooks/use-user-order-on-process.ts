import { useState } from "react";

export const useUserOrderPending = () => {
    const [imgLoaded, setImgLoaded] = useState(false);
    return { imgLoaded, setImgLoaded };
}