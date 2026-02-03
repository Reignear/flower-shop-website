import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4000, orders: 24 },
  { month: "Feb", revenue: 3000, orders: 21 },
  { month: "Mar", revenue: 2000, orders: 29 },
  { month: "Apr", revenue: 2780, orders: 32 },
  { month: "May", revenue: 1890, orders: 18 },
  { month: "Jun", revenue: 2390, orders: 22 },
];

const categoryData = [
  { name: "Bouquets", value: 45 },
  { name: "Gifts", value: 25 },
  { name: "Invitations", value: 20 },
  { name: "Services", value: 10 },
];

// const COLORS = ["#205 0%", "#600%", "#398%", "#828%"];

export default function Dashboard() {
  return (
    <UserLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, Sarah!
          </h1>
          <p className="text-muted-foreground">
            Here's your dashboard overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-foreground">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-4">+12% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Spent
                </p>
                <p className="text-3xl font-bold text-foreground">$1,234</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-4">+8% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Favorites</p>
                <p className="text-3xl font-bold text-foreground">18</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">❤️</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">From your wishlist</p>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Active Subscriptions
                </p>
                <p className="text-3xl font-bold text-foreground">3</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-4">Monthly plans</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card className="col-span-2 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Revenue & Orders
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="var(--color-chart-1)" />
                  <Cell fill="var(--color-chart-2)" />
                  <Cell fill="var(--color-chart-3)" />
                  <Cell fill="var(--color-chart-4)" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Recent Orders
            </h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "#12345",
                    product: "Rose Elegance Bouquet",
                    date: "2024-01-15",
                    amount: "$70.99",
                    status: "Delivered",
                  },
                  {
                    id: "#12344",
                    product: "Tulip Paradise Bundle",
                    date: "2024-01-10",
                    amount: "$89.99",
                    status: "Delivered",
                  },
                  {
                    id: "#12343",
                    product: "Wedding Invitation Cards",
                    date: "2024-01-05",
                    amount: "$120.00",
                    status: "Processing",
                  },
                  {
                    id: "#12342",
                    product: "Gift Hamper Deluxe",
                    date: "2024-01-01",
                    amount: "$150.00",
                    status: "Delivered",
                  },
                  {
                    id: "#12341",
                    product: "Special Mixed Bouquet",
                    date: "2023-12-28",
                    amount: "$95.99",
                    status: "Delivered",
                  },
                ].map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted/50"
                  >
                    <td className="py-3 px-4">{order.id}</td>
                    <td className="py-3 px-4">{order.product}</td>
                    <td className="py-3 px-4">{order.date}</td>
                    <td className="py-3 px-4 font-semibold">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </UserLayout>
  );
}
