import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import AdminLayout from "@/components/layout/admin-layout";

const monthlyData = [
  { month: "Jan", revenue: 4000, orders: 240, customers: 120 },
  { month: "Feb", revenue: 3000, orders: 221, customers: 100 },
  { month: "Mar", revenue: 2000, orders: 229, customers: 105 },
  { month: "Apr", revenue: 2780, orders: 200, customers: 90 },
  { month: "May", revenue: 1890, orders: 229, customers: 85 },
  { month: "Jun", revenue: 2390, orders: 200, customers: 95 },
  { month: "Jul", revenue: 3490, orders: 210, customers: 110 },
];

const categoryData = [
  { name: "Bouquets", value: 35, revenue: "$28,500" },
  { name: "Gifts", value: 25, revenue: "$20,250" },
  { name: "Services", value: 20, revenue: "$16,200" },
  { name: "Subscriptions", value: 15, revenue: "$12,150" },
  { name: "Others", value: 5, revenue: "$4,050" },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const productPerformance = [
  { name: "Rose Elegance", sales: 245, revenue: "$7,350", trend: "+12%" },
  { name: "Tulip Paradise", sales: 189, revenue: "$5,670", trend: "+8%" },
  { name: "Wedding Package", sales: 156, revenue: "$15,600", trend: "+24%" },
  { name: "Gift Hamper", sales: 134, revenue: "$5,360", trend: "+5%" },
  { name: "Subscription", sales: 98, revenue: "$4,900", trend: "+18%" },
];

const customerMetrics = [
  { metric: "New Customers", value: 156, change: "+12%" },
  { metric: "Repeat Customers", value: 892, change: "+5%" },
  { metric: "Active Users", value: 1243, change: "+18%" },
  { metric: "Customer Satisfaction", value: "4.7★", change: "+0.2" },
];

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Analytics
            </h1>
            <p className="text-muted-foreground">
              Detailed insights and performance metrics
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
        </div>

        {/* Customer Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {customerMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-lg p-6"
            >
              <p className="text-muted-foreground text-sm mb-2">
                {metric.metric}
              </p>
              <p className="text-3xl font-bold text-foreground">
                {metric.value}
              </p>
              <p
                className={`text-xs mt-2 ${metric.change.includes("+") ? "text-chart-4" : "text-destructive"}`}
              >
                {metric.change} from last period
              </p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Revenue & Orders */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Monthly Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Distribution */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Sales by Category
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
                  fill="hsl(var(--chart-1))"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Growth Chart */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Customer Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <Bar dataKey="customers" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance Table */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Top Performing Products
            </h2>
            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:bg-muted bg-transparent"
            >
              Export Report
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                    Product Name
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                    Sales
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                    Revenue
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-muted-foreground">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {productPerformance.map((product, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-muted/30 transition"
                  >
                    <td className="py-4 px-4 text-foreground font-medium">
                      {product.name}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {product.sales}
                    </td>
                    <td className="py-4 px-4 text-foreground font-semibold">
                      {product.revenue}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-chart-4/20 text-chart-4">
                        {product.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
