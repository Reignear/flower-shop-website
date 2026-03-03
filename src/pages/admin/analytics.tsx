import AdminLayout from "@/components/layout/admin-layout";
import { Card } from "@/components/ui/card";
import CustomBarChart from "@/components/custom/custom-barchart";
import {
  AdminAnalyticsBreadCrumb,
  MonthLabels,
} from "@/data/admin-analytics-data";
import CustomLineChart from "@/components/custom/custom-linechart";
import CustomPieChart from "@/components/custom/custom-piechart";
import { useAnalytics } from "@/tanstack/fetch.hook";

export default function AnalyticsPage() {
  const { data } = useAnalytics();

  return (
    <AdminLayout breadCrumbs={AdminAnalyticsBreadCrumb}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="md:text-4xl text-2xl font-bold text-foreground mb-2">
              Analytics
            </h1>
            <p className="text-muted-foreground md:text-base text-sm">
              Detailed insights and performance metrics
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className=" p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Order Trends Over the Year
            </h2>

            <CustomLineChart
              data={data?.orderPerMonth || []}
              categories={MonthLabels}
            />
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Order Distribution by Category
            </h2>
            <CustomPieChart data={data?.categoryDistribution || []} />
          </Card>
        </div>

        {/* Customer Growth Chart */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Customer Growth Over the Year
          </h2>
          <CustomBarChart
            data={data?.userCountPerMonth || []}
            categories={MonthLabels}
            yAxisLabel="Customer Growth "
            height={400}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
