import AdminLayout from "@/components/layout/admin-layout";
import { orderPendingBreadCrumb } from "@/data/admin-order-data";
const OrderPending = () => {
  return (
    <AdminLayout breadCrumbs={orderPendingBreadCrumb}>OrderPending</AdminLayout>
  );
};

export default OrderPending;
