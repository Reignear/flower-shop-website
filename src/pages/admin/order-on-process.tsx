import AdminLayout from '@/components/layout/admin-layout';
import { orderOnProcessBreadCrumb } from '@/data/admin-order-data';

const OrderOnProcess = () => {
  return (
    <AdminLayout breadCrumbs={orderOnProcessBreadCrumb}>
      OrderOnProcess
    </AdminLayout>
  );
}

export default OrderOnProcess