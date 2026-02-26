import CustomSkeleton from "@/components/custom/custom-skeleton";
import AdminLayout from "@/components/layout/admin-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderDeclinedBreadCrumb } from "@/data/admin-order-data";
import { useOrderByStatus } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { formatDashText } from "@/utils/dash-formatter";
import { formatDate } from "@/utils/date";
import type { Order } from "@/utils/interface";
import { getStatusBadgeColor } from "@/utils/status";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, LayoutGrid, Table as TableIcon } from "lucide-react";
import {useAdminOrderDeclined} from "@/hooks/use-admin-order-declined";

export default function OrderDeclined() {
  const { data: orders, isLoading: isOrdersLoading } =
    useOrderByStatus("declined");
  const { activeLayout, setActiveLayout } = useAdminOrderDeclined();
  return (
    <AdminLayout className="p-8" breadCrumbs={orderDeclinedBreadCrumb}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              For Pick Up Orders
            </h2>
            <p className="text-gray-600 mt-1">
              Manage and track pending customer orders
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
              <TableIcon />
            </Button>
          </div>
        </div>
        {isOrdersLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <CustomSkeleton type="product-card" key={index} />
            ))}
          </div>
        )}
        {activeLayout === "grid" && !isOrdersLoading && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders?.map((order: Order) => (
                <Card
                  key={order.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border-gray-200"
                >
                  <div className="p-6 space-y-4">
                    {/* Order Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Order Ref. ID
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          #{order.reference_number}
                        </p>
                      </div>
                      <Badge
                        className={`${getStatusBadgeColor(order.status)} border-0 p-2 px-5`}
                      >
                        {formatDashText(capitalizeFirstLetter(order?.status))}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 -mx-6 px-6 py-4">
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                          Customer
                        </p>
                        <p className="text-gray-900 font-medium mt-1">
                          {capitalizeFirstLetter(order?.user?.first_name)}{" "}
                          {capitalizeFirstLetter(order?.user?.middle_name)}{" "}
                          {capitalizeFirstLetter(order?.user?.last_name)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-gray-900 font-medium mt-1">
                          {order?.shipping_address?.barangay},{" "}
                          {order?.shipping_address?.city}
                        </p>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(order?.order_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Delivery Date</p>
                        <p className="font-semibold text-gray-900">
                          {formatDate(order?.delivery_date)}
                        </p>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-3xl font-bold text-emerald-700">
                        ₱{order?.total_amount}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Link to={""} className="w-full">
                        <Button variant={"customized"} className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            {orders?.length === 0 && (
              <Card className="border-gray-200">
                <div className="p-12 text-center">
                  <p className="text-gray-500 text-sm">No orders found</p>
                </div>
              </Card>
            )}
          </div>
        )}

        {activeLayout === "table" && !isOrdersLoading && (
          <div>
            <Table>
              <TableCaption>
                There are total of {orders?.length || 0}{" "}
                {orders && orders?.length > 1 ? "orders" : "order"}
              </TableCaption>
              <TableHeader className="bg-gray-100 border">
                <TableRow>
                  <TableHead className="w-40">Ref. No</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-start">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {orders?.map((order: Order) => (
                  <TableRow>
                    <TableCell className="font-medium py-5">
                      {order.reference_number || "Unknown"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {capitalizeFirstLetter(order.user.first_name)}{" "}
                      {capitalizeFirstLetter(order.user.middle_name)}{" "}
                      {capitalizeFirstLetter(order.user.last_name)}
                    </TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(order.shipping_address.barangay)}
                      {", "}
                      {capitalizeFirstLetter(order.shipping_address.city)}{" "}
                    </TableCell>
                    <TableCell>{formatDate(order.order_date)}</TableCell>
                    <TableCell>{formatDate(order.delivery_date)}</TableCell>
                    <TableCell>₱{order.total_amount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(order.status)}>
                        {capitalizeFirstLetter(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Eye className="h-5 w-5 text-muted-foreground hover:cursor-pointer hover:text-emerald-600" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
