import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import UserLayout from "@/components/layout/user-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useViewForPickupBreadCrumb } from "@/data/user-order-data";
import { useOrderById } from "@/tanstack/fetch.hook";
import { capitalizeAll, capitalizeFirstLetter } from "@/utils/capitalize";
import type { OrderItem } from "@/utils/interface";
import { getStatusBadgeColor, getStepperStatus } from "@/utils/status";
import { Clock, MapPin } from "lucide-react";
import { useParams } from "react-router-dom";

export default function OrderForPickupView() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));
  console.log("Order Details:", order);
  return (
    <UserLayout breadCrumbs={useViewForPickupBreadCrumb()}>
      <div className=" p-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-xl md:text-3xl font-bold text-foreground">
                Order {order?.reference_number || order?.id}
              </h1>
            </div>
            {/* <OrderStatusBadge status={status} /> */}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">
                ORDER DATE
              </p>
              <p className="text-sm font-medium text-foreground">
                {order?.order_date}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                DELIVERY DATE
              </p>
              <p className="text-sm font-medium text-foreground">
                {order?.delivery_date || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left Column - Items and Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order?.order_items.map((item: OrderItem) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-4 last:border-b-0"
                    >
                      <div className="flex items-center gap-2">
                        <div className="md:h-15 md:w-15 h-10 w-10 overflow-hidden rounded-sm">
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground md:text-base text-sm">
                            {item.product.name}
                          </h4>
                          <p className="md:text-sm text-xs text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground md:text-base text-sm">
                          ₱{item.sub_total.toFixed(2)}
                        </p>
                        <p className="md:text-xs text-sm text-muted-foreground">
                          ₱ {item.unit_price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Order Status Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CustomOrderStepper
                    status={getStepperStatus(order?.status)}
                  ></CustomOrderStepper>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary and Info */}
          <div className="space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-xs md:text-sm font-medium">
                    {order?.order_items
                      .reduce(
                        (sum: number, item: OrderItem) => sum + item.sub_total,
                        0,
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Shipping Fee
                  </span>
                  <span className="text-xs md:text-sm font-medium">
                    ₱{order?.shipping_fee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-foreground md:text-base text-sm">
                    Total
                  </span>
                  <span className="font-bold text-base md:text-lg">
                    ₱{order?.total_amount.toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Payment Method
                    </span>
                    <span className="text-xs md:text-sm font-medium">
                      {capitalizeAll(order?.payment?.[0]?.billing?.method_type)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Reference
                    </span>
                    <span className="text-xs md:text-sm font-mono">
                      {capitalizeAll(
                        order?.payment?.[0]?.reference_no || "No reference",
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Status
                    </span>
                    <Badge className={`${getStatusBadgeColor(order?.status)}`}>
                      {capitalizeFirstLetter(order?.status)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Pickup Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs md:text-sm font-medium text-foreground">
                    {order?.shipping_address?.address_line1},{" "}
                    {order?.shipping_address?.address_line2},{" "}
                    {order?.shipping_address?.barangay},{" "}
                    {order?.shipping_address?.city},{" "}
                    {order?.shipping_address?.province}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
