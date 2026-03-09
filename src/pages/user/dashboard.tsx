import CustomLineChart from "@/components/custom/custom-linechart";
import CustomPieChart from "@/components/custom/custom-piechart";
import UserLayout from "@/components/layout/user-layout";
import { Card } from "@/components/ui/card";
import { MonthLabels } from "@/data/admin-analytics-data";
import { dashboardBreadCrumbs } from "@/data/user-dashboard-data";
import { useDashboard } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { Cuboid, MessageCircle, PhilippinePeso } from "lucide-react";

export default function Dashboard() {
  const { data: dashboardData } = useDashboard();

  return (
    <UserLayout breadCrumbs={dashboardBreadCrumbs}>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back,{" "}
            {capitalizeFirstLetter(
              dashboardData?.activeUser?.first_name || "User",
            )}
            !
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
                  {dashboardData?.orders?.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span>
                  <Cuboid className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  Total Spent
                </p>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  ₱ {dashboardData?.totalAmount?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span>
                  <PhilippinePeso className="w-5 h-5" />
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  Ave. Product Feedback
                </p>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  {dashboardData?.averageProductFeedback?.toFixed(1) || "0.0"}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span>
                  <MessageCircle className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  Ave. Order Feedback
                </p>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  {dashboardData?.averageOrderFeedback?.toFixed(1) || "0.0"}
                </p>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span>
                  <MessageCircle className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Revenue Chart */}
          <Card className="md:col-span-2 p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">
              Spenditure Line Chart
            </h2>
            <CustomLineChart
              data={dashboardData?.totalAmountOrderPerMonth || []}
              categories={MonthLabels}
            />
          </Card>

          {/* Category Distribution */}
          <Card className="p-4 md:p-6">
            <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">
              Order Distribution by Category
            </h2>
            <CustomPieChart data={dashboardData?.categoryDistribution || []} />
          </Card>
        </div>
      </div>
    </UserLayout>
  );
}
