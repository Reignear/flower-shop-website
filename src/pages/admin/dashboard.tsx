import AdminLayout from "@/components/layout/admin-layout";
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
import { TrendingUp, Users, ShoppingBag, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import {dashboardBreadCrumb} from "@/data/admin-layout-data";
const salesData = [
  { month: "Jan", sales: 12000, revenue: 24000, orders: 124 },
  { month: "Feb", sales: 15000, revenue: 28000, orders: 156 },
  { month: "Mar", sales: 18000, revenue: 32000, orders: 189 },
  { month: "Apr", sales: 16000, revenue: 30000, orders: 172 },
  { month: "May", sales: 22000, revenue: 38000, orders: 218 },
  { month: "Jun", sales: 25000, revenue: 42000, orders: 245 },
];

const categoryData = [
  { name: "Bouquets", value: 45, sales: 18000 },
  { name: "Gifts", value: 25, sales: 10000 },
  { name: "Invitations", value: 20, sales: 8000 },
  { name: "Services", value: 10, sales: 4000 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

export default function Dashboard() {
  return (
    <AdminLayout breadCrumbs={dashboardBreadCrumb}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's your business overview
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-foreground">$164,000</p>
              </div>
              <div className="w-12 h-12 bg-chart-1/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-1" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              +18% from last month
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-foreground">904</p>
              </div>
              <div className="w-12 h-12 bg-chart-2/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-chart-2" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              +24% from last month
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Customers
                </p>
                <p className="text-3xl font-bold text-foreground">2,547</p>
              </div>
              <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-chart-4" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              +31% from last month
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Feedback Received
                </p>
                <p className="text-3xl font-bold text-foreground">487</p>
              </div>
              <div className="w-12 h-12 bg-chart-5/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-chart-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Avg Rating: 4.7★
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Sales & Revenue Chart */}
          <Card className="col-span-2 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Sales & Revenue Trend
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Distribution */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
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
      </div>
    </AdminLayout>
  );
}
