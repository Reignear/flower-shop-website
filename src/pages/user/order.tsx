import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const orders = [
  {
    id: "#12345",
    product: "Rose Elegance Bouquet",
    quantity: 1,
    date: "2024-01-15",
    amount: "$70.99",
    status: "Delivered",
    trackingNumber: "TRACK123456",
  },
  {
    id: "#12344",
    product: "Tulip Paradise Bundle",
    quantity: 2,
    date: "2024-01-10",
    amount: "$89.99",
    status: "Delivered",
    trackingNumber: "TRACK123455",
  },
  {
    id: "#12343",
    product: "Wedding Invitation Cards",
    quantity: 150,
    date: "2024-01-05",
    amount: "$120.00",
    status: "Processing",
    trackingNumber: "TRACK123454",
  },
  {
    id: "#12342",
    product: "Gift Hamper Deluxe",
    quantity: 1,
    date: "2024-01-01",
    amount: "$150.00",
    status: "Delivered",
    trackingNumber: "TRACK123453",
  },
  {
    id: "#12341",
    product: "Special Mixed Bouquet",
    quantity: 1,
    date: "2023-12-28",
    amount: "$95.99",
    status: "Delivered",
    trackingNumber: "TRACK123452",
  },
  {
    id: "#12340",
    product: "Aster Delight Bouquet",
    quantity: 3,
    date: "2023-12-24",
    amount: "$212.97",
    status: "Delivered",
    trackingNumber: "TRACK123451",
  },
  {
    id: "#12339",
    product: "Debut Invitation Cards",
    quantity: 200,
    date: "2023-12-20",
    amount: "$180.00",
    status: "Delivered",
    trackingNumber: "TRACK123450",
  },
  {
    id: "#12338",
    product: "Subscription Service",
    quantity: 1,
    date: "2023-12-15",
    amount: "$49.99",
    status: "Active",
    trackingNumber: "SUB123449",
  },
];

const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Active: "bg-purple-100 text-purple-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Order() {
  return (
    <UserLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and track all your orders
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <Button className="bg-primary text-primary-foreground">
            All Orders
          </Button>
          <Button variant="outline">Delivered</Button>
          <Button variant="outline">Processing</Button>
          <Button variant="outline">Cancelled</Button>
        </div>

        {/* Orders Table */}
        <Card className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Order ID
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Product
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Qty
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Amount
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Status
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-4 px-4 font-semibold text-foreground">
                      {order.id}
                    </td>
                    <td className="py-4 px-4">{order.product}</td>
                    <td className="py-4 px-4">{order.quantity}</td>
                    <td className="py-4 px-4">{order.date}</td>
                    <td className="py-4 px-4 font-semibold">{order.amount}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status as keyof typeof statusColors]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline">
                        Track
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Order Details Modal Example */}
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Order Details - #12345
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Tracking Number</p>
              <p className="text-base font-semibold text-foreground">
                TRACK123456
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Delivery</p>
              <p className="text-base font-semibold text-foreground">
                January 18, 2024
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shipping Address</p>
              <p className="text-base font-semibold text-foreground">
                123 Main Street, City, State 12345
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Total</p>
              <p className="text-base font-semibold text-foreground">$70.99</p>
            </div>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}
