import { useForPickupBreadCrumb } from "@/data/user-order-data";
import Order from "./order";

const OrderForPickup = () => {
  return <Order breadCrumbs={useForPickupBreadCrumb}>OrderForPickup</Order>;
};

export default OrderForPickup;
