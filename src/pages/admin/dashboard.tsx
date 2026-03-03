/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminLayout from "@/components/layout/admin-layout";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  MessageSquare,
  Star,
} from "lucide-react";

import { dashboardBreadCrumb } from "@/data/admin-layout-data";
import {
  useDashboard,
  useFeedbackOrder,
  useProduct,
  useAnalytics,
} from "@/tanstack/fetch.hook";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/name-fallback";
import { Separator } from "@/components/ui/separator";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import CustomPieChart from "@/components/custom/custom-piechart";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { data } = useDashboard();
  const { data: product } = useProduct();
  const { data: feedbacks } = useFeedbackOrder("all");
  const { data: analytics } = useAnalytics();
  return (
    <AdminLayout breadCrumbs={dashboardBreadCrumb}>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="md:text-4xl text-2xl font-bold  md:text-start text-center text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground md:text-start text-center md:text-base text-sm">
            Welcome back! Here's your business overview
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-card border border-border rounded-lg p-3 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Revenue
                </p>
                <p className="md:text-3xl text-2xl font-bold text-foreground">
                  ₱ {data?.totalRevenue || 0}
                </p>
              </div>
              <div className="md:w-12 md:h-12 w-8 h-8 bg-chart-1/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="md:w-6 md:h-6 w-3 h-3 text-chart-1" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-3 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Orders
                </p>
                <p className="md:text-3xl text-2xl font-bold text-foreground">
                  {data?.totalOrders || 0}
                </p>
              </div>
              <div className="md:w-12 md:h-12 w-8 h-8 bg-chart-2/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="md:w-6 md:h-6 w-3 h-3 text-chart-2" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-3 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total Customers
                </p>
                <p className="md:text-3xl text-2xl font-bold text-foreground">
                  {data?.totalCustomers || 0}
                </p>
              </div>
              <div className="md:w-12 md:h-12 w-8 h-8 bg-chart-4/20 rounded-lg flex items-center justify-center">
                <Users className="md:w-6 md:h-6 w-3 h-3 text-chart-4" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-3 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Feedback Received
                </p>
                <p className="md:text-3xl text-2xl font-bold text-foreground">
                  {data?.totalFeedback || 0}
                </p>
              </div>
              <div className="md:w-12 md:h-12 w-8 h-8 bg-chart-5/20 rounded-lg flex items-center justify-center">
                <MessageSquare className="md:w-6 md:h-6 w-3 h-3 text-chart-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Link
            to="/admin/analytics"
            className="col-span-2 group transition-all duration-300 hover:scale-105"
          >
            <Card className="group-hover:shadow-lg group-hover:shadow-chart-1/20 group-hover:border-chart-1/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-chart-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="md:h-65 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-lg font-semibold">
                    Order Distribution by Category
                  </h1>
                </div>
                <CustomPieChart data={analytics?.categoryDistribution || []} />
              </CardContent>
            </Card>
          </Link>

          <Link
            to="/admin/products"
            className="group transition-all duration-300 hover:scale-105 md:col-span-1 col-span-2"
          >
            <Card className="group-hover:shadow-lg group-hover:shadow-chart-2/20 group-hover:border-chart-2/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-chart-2/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="md:h-65 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-lg font-semibold">Latest Products</h1>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {product?.slice(0, 3).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img
                            src={`${item.image_url}`}
                            alt=""
                            className="w-10 h-10 object-cover rounded-md group-hover:scale-110 transition-transform duration-300"
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>₱ {item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Link>

          <Link
            to="/admin/feedback/order"
            className="group transition-all duration-300 hover:scale-105 md:col-span-1 col-span-2"
          >
            <Card className="group-hover:shadow-lg group-hover:shadow-chart-5/20 group-hover:border-chart-5/50 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-chart-5/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="md:h-65 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-lg font-semibold">Recent Feedbacks</h1>
                </div>
                {feedbacks?.slice(0, 3).map((item: any) => (
                  <div key={item.id}>
                    <div className="mb-2 flex gap-2 items-center">
                      <div>
                        <Avatar className="h-12 w-12 group-hover:scale-110 transition-transform duration-300">
                          <AvatarFallback>
                            {getInitials(
                              item.user?.first_name +
                                " " +
                                item.user?.last_name,
                            )}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < item.rating
                                  ? "fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          -{capitalizeFirstLetter(item.user?.first_name)}{" "}
                          {capitalizeFirstLetter(item.user?.last_name)}
                        </p>
                        <p className="text-sm">{item.feedback}</p>
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
                {feedbacks?.length === 0 && (
                  <p className="text-sm text-center text-muted-foreground">
                    No feedbacks received yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
