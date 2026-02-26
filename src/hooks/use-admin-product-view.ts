import { useState } from "react";

export const useAdminProductView = () => {
    const [imgLoaded, setImgLoaded] = useState(false);
    return {
        imgLoaded,
        setImgLoaded    
    }
}