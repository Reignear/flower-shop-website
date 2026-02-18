import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import { Button } from "@/components/ui/button";
import { useOrderById } from "@/tanstack/fetch.hook";
import { Package, MapPin, CreditCard, Truck, Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import UserLayout from "@/components/layout/user-layout";
import { capitalizeAll, capitalizeFirstLetter } from "@/utils/capitalize";
import type { OrderItem } from "@/utils/interface";
import { getStepperStatus, getStatusBadgeColor } from "@/utils/status";
import { useOrderViewBreadCrumb } from "@/data/user-order-view-data";

export default function OrderView() {
  const { id: id } = useParams();
  const { data: order, isLoading: isOrderLoading } = useOrderById(Number(id));

  const stepperStatus = getStepperStatus(order?.status);
  return (
    <UserLayout breadCrumbs={useOrderViewBreadCrumb()}>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-10">
        <div className=" mx-auto space-y-5">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-slate-900">
                Order #{order?.id}
              </h1>

              <span
                className={`px-4 py-2 rounded-full font-semibold text-sm ${getStatusBadgeColor(order?.status)}`}
              >
                {capitalizeFirstLetter(order?.status)}
              </span>
            </div>
            <p className="text-slate-500">
              Ordered on{" "}
              {new Date(order?.order_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Main Content - Teal Border Card */}
          <div className="overflow-hidden transition-all duration-300 rounded-lg border-0 bg-to-br from-white to-gray-50 ring-1 ring-emerald-300 ">
            {/* Order Items Section */}
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-500" />
                Order Items
              </h2>

              <div className="space-y-6">
                {order?.order_items_table.map(
                  (item: OrderItem, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-6 border-b border-slate-200 last:border-b-0 last:pb-0"
                    >
                      {/* Product Image */}
                      <div className="shrink-0">
                        <img
                          src={item.product_id.image_url}
                          alt={item.product_id.name}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                              {item?.product_id.name}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                              Code: {capitalizeAll(item?.product_id.code)}
                            </p>
                          </div>
                          <p className="text-2xl font-bold text-emerald-500">
                            ₱{item?.sub_total.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex gap-6 mt-4 text-sm">
                          <div>
                            <p className="text-slate-500">Quantity</p>
                            <p className="font-semibold  text-emerald-500">
                              {item?.quantity}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500">Unit Price</p>
                            <p className="font-semibold text-slate-900">
                              ₱{item?.unit_price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mt-8 pt-6 border-t-2 border-slate-200 space-y-3">
                <div className="flex justify-between items-center text-slate-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ₱{(order?.total_amount - order?.shipping_fee).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Shipping Fee</span>
                  <span className="font-semibold">
                    ₱{order?.shipping_fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-slate-900 bg-linear-to-r from-emerald-50 to-cyan-50 p-3 rounded-lg">
                  <span>Total Amount</span>
                  <span className="text-emerald-500">
                    ₱{order?.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {/* Order Status */}
            <div className="px-6 py-6 bg-gray-50 w-full dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Order Status
              </p>
              <CustomOrderStepper status={stepperStatus} />
            </div>
          </div>

          {/* Order Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Order Details */}
            <div className="bg-white rounded-lg p-6 border-l-2 border-emerald-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Order Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Order Date</span>
                  <span className="font-semibold text-slate-900">
                    {new Date(order?.order_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Reference Number</span>
                  <span className="font-semibold  font-mono text-emerald-500">
                    {order?.reference_number || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Order Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(order?.staus)}`}
                  >
                    {capitalizeFirstLetter(order?.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Currency</span>
                  <span className="font-semibold text-slate-900">
                    {order?.payment_table.currency || "Not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg p-6 border-l-2 border-emerald-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                Payment Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Method</span>

                  {order?.payment_table?.[0]?.billing_method_id?.method_type ===
                    "cod" && (
                    <span className="font-semibold text-slate-900">
                      Cash on Delivery
                    </span>
                  )}
                  {order?.payment_table?.[0]?.billing_method_id?.method_type ===
                    "bank" && (
                    <span className="font-semibold text-slate-900">
                      Bank Transfer
                    </span>
                  )}
                  {order?.payment_table?.[0]?.billing_method_id?.method_type ===
                    "paypal" && (
                    <span className="font-semibold text-slate-900">PayPal</span>
                  )}
                  {order?.payment_table?.[0]?.billing_method_id?.method_type ===
                    "gcash" && (
                    <span className="font-semibold text-slate-900">Gcash</span>
                  )}
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(order?.payment_table?.[0]?.status)}`}
                  >
                    {capitalizeFirstLetter(order?.payment_table?.[0]?.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Amount</span>
                  <span className="font-bold text-lg text-emerald-500">
                    ₱{order?.payment_table?.[0]?.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg p-6 border-l-2 border-emerald-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-500" />
                Shipping Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping Fee</span>
                  <span className="font-semibold text-slate-900">
                    ₱{order?.shipping_fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping Status</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold `}
                  >
                    Meet up only
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg p-6 border-l-2 border-emerald-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                Delivery Address
              </h3>
              <div className="text-slate-700 space-y-1">
                <p className="font-semibold">
                  {order?.user_address_table.address_line1}{" "}
                  {order?.user_address_table.address_line2}{" "}
                  {order?.user_address_table.barangay}
                </p>
                <p className="font-semibold"></p>
                <p>
                  {order?.user_address_table.city},{" "}
                  {order?.user_address_table.province}
                </p>
                <p>
                  {order?.user_address_table.postal_code},{" "}
                  {order?.user_address_table.region}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Button className="p-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium gap-2">
              Download Invoice
            </Button>

            <Button className="p-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium gap-2">
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
