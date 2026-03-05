import { useState } from "react";

export const useUserOrderDeclined = () => {
    const [imgLoaded, setImgLoaded] = useState<boolean>(false);
    return {
        imgLoaded,
        setImgLoaded
    }
}