import { useCancelledBreadCrumb } from "@/data/user-order-data";
import Order from "@/pages/user/order";

export default function OrderCancelled() {
  return <Order breadCrumbs={useCancelledBreadCrumb}>OrderCancelled</Order>;
}
