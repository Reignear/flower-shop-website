export const getColorFromStatus = (status: string) => {
    if (status === "pending") return "bg-yellow-500";
    if (status === "on-process") return "bg-blue-500";
    if (status === "for-pickup") return "bg-purple-500";
    if (status === "delivered") return "bg-green-500";
    if (status === "declined") return "bg-red-500";
    if (status === "cancelled") return "bg-red-500";
    return "bg-gray-500"; 

}