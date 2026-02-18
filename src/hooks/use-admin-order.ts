import { useState } from "react";

export const useAdminOrder = () => {
    const [activeLayout, setActiveLayout] = useState<"grid" | "table">("grid");
    return {
        activeLayout,
        setActiveLayout,
    }
}