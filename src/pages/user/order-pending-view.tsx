import UserLayout from "@/components/layout/user-layout";
import { AlertCircle } from "lucide-react";
import type { OrderItem, Order } from "@/utils/interface";
import { formatDate } from "@/utils/date";
import { useOrderById } from "@/tanstack/fetch.hook";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { getStatusBadgeColor, getStepperStatus } from "@/utils/status";
import { formatDashText } from "@/utils/dash-formatter";
import CustomDialog from "@/components/custom/custom-dialog";
import OrderFormUpdate from "@/components/form/order-form-update";
import {
  cancelDescription,
  cancelTitle,
  useViewPendingBreadCrumb,
} from "@/data/user-order-data";
import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import { Toaster } from "react-hot-toast";

export default function OrderPendingView() {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id)) as { data: Order };

  return (
    <UserLayout breadCrumbs={useViewPendingBreadCrumb()}>
      <Toaster position="bottom-right" />
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex gap-4 mb-6">
                  <AlertCircle className="w-6 h-6 text-destructive flex-0 mt-0.5" />
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      Order #{order?.reference_number} is Pending
                    </h2>
                    <p className="md:text-base text-sm text-muted-foreground">
                      Cancelling this order cannot be undone. You will receive a
                      refund to your original payment method within 3-5 business
                      days.
                    </p>
                  </div>
                </div>

                <div className="bg-destructive/5 border border-destructive/30 rounded-lg p-4 mb-8">
                  <h3 className="font-semibold text-foreground mb-3">
                    What happens when you cancel:
                  </h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>Your order will be cancelled immediately</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>You will receive a full refund</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-destructive">•</span>
                      <span>
                        The seller will be notified of the cancellation
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <CustomDialog
                    title={cancelTitle}
                    description={cancelDescription}
                    trigger={
                      <Button variant="destructive">Cancel Order</Button>
                    }
                  >
                    <OrderFormUpdate id={order?.id} />
                  </CustomDialog>
                </div>
              </div>
              <div className="border rounded-lg p-6">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold mb-6 text-foreground">
                    Order Status
                  </h2>
                </div>
                <CustomOrderStepper status={getStepperStatus(order?.status)} />
              </div>
              <div>
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-lg md:text-xl font-semibold mb-6 text-foreground">
                      Shipping Address
                    </h2>

                    <div className="space-y-2 text-sm md:text-base text-foreground">
                      <p className="  font-medium">
                        {order?.shipping_address.address_line1}
                        {", "}
                        {order?.shipping_address.address_line2}
                        {", "}
                        {order?.shipping_address.barangay}
                        {", "}
                        {order?.shipping_address.city}
                        {", "}
                        {order?.shipping_address.province}
                        {", "}
                        {order?.shipping_address.postal_code}
                      </p>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-base md:text-xl font-semibold mb-6 text-foreground">
                      Payment Information
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2">
                        <span className="md:text-base text-sm text-muted-foreground">
                          Payment Method
                        </span>
                        <span className="font-medium text-foreground capitalize">
                          {formatDashText(
                            order?.payment?.[0]?.billing?.method_type,
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2">
                        <span className="md:text-base text-sm text-muted-foreground">
                          Payment Status
                        </span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(order?.payment?.[0]?.status)}`}
                        >
                          {capitalizeFirstLetter(order?.payment?.[0]?.status)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-t border-border pt-2">
                        <span className=" md:text-base text-sm text-muted-foreground">
                          Reference Number
                        </span>
                        <span className="font-mono text-sm text-foreground">
                          {order?.payment?.[0]?.reference_number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* {mockOrder.remarks && (
                      <div className="bg-card border border-border rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-foreground">
                          Remarks
                        </h2>
                        <p className="text-foreground leading-relaxed">
                          {mockOrder.remarks}
                        </p>
                      </div>
                    )} */}
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <h2 className="text-base md:text-xl font-semibold mb-6 text-foreground">
                      Order Summary
                    </h2>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-sm md:text-base text-muted-foreground">
                          Order ID
                        </span>
                        <span className="font-medium text-foreground">
                          #{order?.reference_number}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className=" text-sm md:text-base text-muted-foreground">
                          Order Date
                        </span>
                        <span className="font-medium text-foreground">
                          {formatDate(order?.order_date)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className="text-sm md:text-base text-muted-foreground">
                          Status
                        </span>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(order?.status)}`}
                        >
                          {capitalizeFirstLetter(order?.status)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-3 border-b border-border">
                        <span className=" text-sm md:text-base text-muted-foreground">
                          Expected Delivery
                        </span>
                        <span className="font-medium text-foreground">
                          {formatDate(order?.delivery_date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6">
                    <h3 className="text-base md:text-lg font-semibold mb-4 text-foreground">
                      Items
                    </h3>
                    <div className="space-y-3">
                      {order?.order_items.map((item: OrderItem) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start py-3 border-b border-border last:border-0 gap-2"
                        >
                          <div className="md:h-12 md:w-12 h-10 w-10 rounded-md overflow-hidden bg-muted ">
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm md:text-base font-medium text-foreground">
                              {item.product.name}
                            </p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-foreground">
                            ₱ {item.sub_total}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm md:text-base">
                        Subtotal
                      </span>
                      <span className="font-medium text-foreground">
                        ₱{" "}
                        {(order?.total_amount - order?.shipping_fee).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground text-sm md:text-base">
                        Shipping
                      </span>
                      <span className="font-medium text-foreground">
                        ₱ {order?.shipping_fee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground text-sm md:text-base">
                        Total Amount
                      </span>
                      <span className="text-xl font-bold text-primary">
                        ₱ {order?.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </UserLayout>
  );
}
