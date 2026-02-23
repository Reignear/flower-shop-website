import type { Status } from "@/utils/types";

// For stepper status, we will use the same status as the order status, but we will map it to the stepper status
export function getStepperStatus(status: string): Status {
  if (status === "for-pickup") return "for-pickup";
  if (status === "on-process") return "on-process";
  if (status === "delivered") return "delivered";
  if (status === "declined") return "declined";
  return "pending";
}

// For badge status, we will use the same status as the order status, but we will map it to the badge status
export function getStatusBadgeColor(status: string) {
  switch (status) {
    case "on-going":
      return "bg-blue-100 text-blue-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "delivered":
      return "bg-green-100 text-green-700";
    case "declined":
      return "bg-red-100 text-red-700";
    case "ready-for-pickup":
      return "bg-green-100 text-green-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}
