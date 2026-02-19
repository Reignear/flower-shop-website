import AdminLayout from "@/components/layout/admin-layout";
import { orderDeliveredBreadCrumb } from "@/data/admin-order-data";

const OrderDelivered = () => {
  return (
    <AdminLayout breadCrumbs={orderDeliveredBreadCrumb}>
      OrderDelivered
    </AdminLayout>
  );
};

export default OrderDelivered;
