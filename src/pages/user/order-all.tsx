import Order from "@/pages/user/order";
import { CustomOrderCard } from "@/components/custom/custom-order-card";
import type { Order as OrderType } from "@/utils/interface";
import { useOrder } from "@/tanstack/fetch.hook";
const OrderAll = () => {
  const { data: orders } = useOrder();
  return (
    <Order>
      {orders?.map((order: OrderType) => (
        <CustomOrderCard key={order.id} order={order} />
      ))}
    </Order>
  );
};

export default OrderAll;
