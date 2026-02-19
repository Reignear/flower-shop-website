import { useOrderById } from "@/tanstack/fetch.hook";
import { useParams } from "react-router-dom";

export function useOrderViewBreadCrumb() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  return [
    { label: "Dashboard", href: "/user/dashboard" },
    { label: "Order", href: "/user/order/all" },
    {
      label: `${order?.reference_number || order?.id}`,
      href: `/user/order/${id}`,
    },
  ];
}
