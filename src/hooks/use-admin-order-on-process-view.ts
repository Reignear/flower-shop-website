import { useState } from "react";

export const useAdminOrderOnProcessView = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    return{
        selectedStatus,
        setSelectedStatus
    }
}