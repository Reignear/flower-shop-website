import AdminLayout from "@/components/layout/admin-layout";
import { orderForPickupBreadCrumb } from "@/data/admin-order-data";

const OrderForPickup = () => {
  return (
    <AdminLayout breadCrumbs={orderForPickupBreadCrumb}>
      Order For Pickup
    </AdminLayout>
  );
};

export default OrderForPickup;
