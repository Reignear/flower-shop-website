import AdminLayout from "@/components/layout/admin-layout";
import { orderDeclinedBreadCrumb } from "@/data/admin-order-data";

const OrderDeclined = () => {
  return (
    <AdminLayout breadCrumbs={orderDeclinedBreadCrumb}>
      OrderDeclined
    </AdminLayout>
  );
};

export default OrderDeclined;
