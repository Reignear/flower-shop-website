import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
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
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, Sarah!
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Here's your dashboard overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  Total Orders
                </p>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  24
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl md:text-2xl">📦</span>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-3 md:mt-4">
              +12% from last month
            </p>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  Total Spent
                </p>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  $1,234
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl md:text-2xl">💰</span>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-3 md:mt-4">
              +8% from last month
            </p>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  Favorites
                </p>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  18
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-xl md:text-2xl">❤️</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3 md:mt-4">
              From your wishlist
            </p>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  Active Subscriptions
                </p>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  3
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl md:text-2xl">🔄</span>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-3 md:mt-4">Monthly plans</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Revenue Chart */}
          <Card className="md:col-span-2 p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">
              Revenue & Orders
            </h2>
            <ResponsiveContainer width="100%" height={250} className="md:h-75">
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
          <Card className="p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">
              Category Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250} className="md:h-75">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={60}
                  className="md:outerRadius-[80px]"
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

      </div>
    </UserLayout>
  );
}
