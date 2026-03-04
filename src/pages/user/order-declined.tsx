import { useDeclinedBreadCrumb } from "@/data/user-order-data";
import Order from "./order";

const OrderDecline = () => {
  return <Order breadCrumbs={useDeclinedBreadCrumb}>OrderDecline</Order>;
};

export default OrderDecline;
