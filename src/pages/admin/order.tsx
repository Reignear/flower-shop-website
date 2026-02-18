import AdminLayout from "@/components/layout/admin-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Table } from "lucide-react";
import { useAdminOrder } from "@/hooks/use-admin-order";

// Sample order data - replace with real data from API
const SAMPLE_ORDERS = [
  {
    id: 31,
    order_date: "2026-02-18",
    status: "pending",
    total_amount: 299,
    reference_number: "ORD-569142",
    shipping_fee: 50,
    customer_name: "John Doe",
    city: "Santo Tomas",
    region: "Davao Region",
  },
  {
    id: 30,
    order_date: "2026-02-17",
    status: "ready-for-pick",
    total_amount: 498,
    reference_number: "ORD-569141",
    shipping_fee: 50,
    customer_name: "Jane Smith",
    city: "Makati",
    region: "Metro Manila",
  },
  {
    id: 29,
    order_date: "2026-02-16",
    status: "delivered",
    total_amount: 850,
    reference_number: "ORD-569140",
    shipping_fee: 75,
    customer_name: "Robert Johnson",
    city: "Cebu City",
    region: "Cebu",
  },
  {
    id: 28,
    order_date: "2026-02-15",
    status: "pending",
    total_amount: 650,
    reference_number: "ORD-569139",
    shipping_fee: 60,
    customer_name: "Maria Garcia",
    city: "Quezon City",
    region: "Metro Manila",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "ready-for-pick":
      return "bg-blue-100 text-blue-800";
    case "delivered":
      return "bg-emerald-100 text-emerald-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function OrdersPage() {
  const { activeLayout, setActiveLayout } = useAdminOrder();

  return (
    <AdminLayout className="p-8">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Orders</h2>
            <p className="text-gray-600 mt-1">
              Manage and track all customer orders
            </p>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <Button
              variant={`${activeLayout === "grid" ? "customized" : "outline"}`}
              onClick={() => setActiveLayout("grid")}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={`${activeLayout === "table" ? "customized" : "outline"}`}
              onClick={() => setActiveLayout("table")}
            >
              <Table />
            </Button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_ORDERS.map((order) => (
            <Card
              key={order.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-gray-200"
            >
              <div className="p-6 space-y-4">
                {/* Order Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Order ID
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      #{order.id}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(order.status)} border-0 p-2 px-5`}
                  >
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>

                {/* Reference Number */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 font-medium">
                    Reference Number
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {order.reference_number}
                  </p>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4 bg-gray-50 -mx-6 px-6 py-4">
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      Customer
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {order.customer_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
                      {order.city}
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900">
                      {order.order_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Shipping Fee</p>
                    <p className="font-semibold text-gray-900">
                      ₱{order.shipping_fee}
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-3xl font-bold text-emerald-700">
                    ₱{order.total_amount}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-2 w-full">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State (if no orders) */}
        {SAMPLE_ORDERS.length === 0 && (
          <Card className="border-gray-200">
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
