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
import { formatDate } from "@/utils/date";
import CustomSkeleton from "@/components/custom/custom-skeleton";

export default function OrderView() {
  const { id: id } = useParams();
  const { data: order, isLoading: isOrderLoading } = useOrderById(Number(id));
  return (
    <UserLayout breadCrumbs={useOrderViewBreadCrumb()}>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4 md:p-10">
        <div className="mx-auto space-y-4 md:space-y-6">
          {/* Header */}
          <div className="mb-4 md:mb-6">
            <div className="flex md:flex-row md:items-center justify-between gap-2 mb-2">
              {isOrderLoading ? (
                <CustomSkeleton type="large-text" width={15} />
              ) : (
                <h1 className="text-xl md:text-3xl font-bold text-slate-900">
                  Order #{order?.reference_number}
                </h1>
              )}
              {isOrderLoading ? (
                <CustomSkeleton type="status-badge" width={5} />
              ) : (
                <span
                  className={`px-4 py-2 rounded-full font-semibold text-xs md:text-sm ${getStatusBadgeColor(
                    order?.status,
                  )} self-start md:self-auto`}
                >
                  {capitalizeFirstLetter(order?.status)}
                </span>
              )}
            </div>
            {isOrderLoading ? (
              <CustomSkeleton type="small-text" width={15} />
            ) : (
              <p className="text-sm md:text-base text-slate-500">
                Ordered on {formatDate(order?.order_date)}
              </p>
            )}
          </div>

          {/* Main Content - Teal Border Card */}
          <div className="overflow-hidden transition-all duration-300 rounded-lg border-0 bg-to-br from-white to-gray-50 ring-1 ring-emerald-300">
            {/* Order Items Section */}
            <div className="p-4 md:p-8">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-4 md:mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-500" />
                Order Items
              </h2>

              <div className="space-y-4 md:space-y-6">
                {order?.order_items.map((item: OrderItem, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 pb-4 md:pb-6 border-b border-slate-200 last:border-b-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <div className="shrink-0 self-center md:self-start">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="md:w-32 md:h-32 w-24 h-24 object-cover rounded-lg shadow-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3 md:mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item?.product.name}
                          </h3>
                          <p className="text-xs md:text-sm text-slate-500 mt-1">
                            Code: {capitalizeAll(item?.product.code)}
                          </p>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-emerald-500">
                          ₱{item?.sub_total.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex gap-6 mt-4 text-sm">
                        <div>
                          <p className="text-slate-500">Quantity</p>
                          <p className="font-semibold text-emerald-500">
                            {item?.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Unit Price</p>
                          <p className=" font-semibold text-slate-900">
                            ₱{item?.unit_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t-2 border-slate-200 space-y-3">
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
                <div className="flex justify-between items-center text-lg md:text-xl font-bold text-slate-900 bg-linear-to-r from-emerald-50 to-cyan-50 p-3 rounded-lg">
                  <span>Total Amount</span>
                  <span className="text-emerald-500">
                    ₱{order?.total_amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {/* Order Status */}
            <div className="px-4 md:px-6 py-4 md:py-6 bg-gray-50 w-full dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Order Status
              </p>
              <CustomOrderStepper status={getStepperStatus(order?.status)} />
            </div>
          </div>

          {/* Order Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Order Details */}
            <div className="bg-white rounded-lg p-4 md:p-6 border-l-2 border-emerald-300">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Order Details
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                  <span className="text-xs md:text-base text-slate-600">
                    Order Date
                  </span>
                  <span className=" md:text-base text-sm font-semibold text-slate-900">
                    {new Date(order?.order_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Reference Number
                  </span>
                  <span className="font-semibold font-mono text-emerald-500 break-all">
                    {order?.reference_number || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Order Status
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full md:text-base text-sm font-semibold self-start md:self-auto ${getStatusBadgeColor(
                      order?.staus,
                    )}`}
                  >
                    {capitalizeFirstLetter(order?.status)}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Currency
                  </span>
                  <span className="font-semibold text-slate-900 md:text-base text-sm">
                    {order?.payment?.currency || "Not set"}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg p-4 md:p-6 border-l-2 border-emerald-300">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                Payment Information
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Payment Method
                  </span>

                  {order?.payment?.[0]?.billing?.method_type === "cod" && (
                    <span className="md:text-base text-sm font-semibold text-slate-900">
                      Cash on Delivery
                    </span>
                  )}
                  {order?.payment?.[0]?.billing?.method_type === "bank" && (
                    <span className="md:text-base text-sm font-semibold text-slate-900">
                      Bank Transfer
                    </span>
                  )}
                  {order?.payment?.[0]?.billing?.method_type === "paypal" && (
                    <span className="md:text-base text-sm font-semibold text-slate-900">
                      PayPal
                    </span>
                  )}
                  {order?.payment?.[0]?.billing?.method_type === "gcash" && (
                    <span className="md:text-base text-sm font-semibold text-slate-900">
                      Gcash
                    </span>
                  )}
                </div>

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Payment Status
                  </span>
                  <span
                    className={` md:text-base text-sm  px-3 py-1 rounded-full font-semibold self-start md:self-auto ${getStatusBadgeColor(
                      order?.payment?.[0]?.status,
                    )}`}
                  >
                    {capitalizeFirstLetter(order?.payment?.[0]?.status)}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Total Amount
                  </span>
                  <span className="font-bold md:text-base text-sm  text-emerald-500">
                    ₱{order?.payment?.[0]?.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg p-4 md:p-6 border-l-2 border-emerald-300">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-500" />
                Shipping Information
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Shipping Fee
                  </span>
                  <span className="font-semibold text-slate-900 ">
                    ₱{order?.shipping_fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0">
                  <span className="text-slate-600 text-xs md:text-base">
                    Shipping Status
                  </span>
                  <span className="px-3 py-1 rounded-full md:text-base text-sm font-semibold self-start md:self-auto">
                    Meet up / Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-lg p-4 md:p-6 border-l-2 border-emerald-300">
              <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                Delivery Address
              </h3>
              <div className="text-slate-700 space-y-1 text-sm md:text-base">
                <p className="font-semibold">
                  {order?.shipping_address.address_line1}{" "}
                  {order?.shipping_address.address_line2}{" "}
                  {order?.shipping_address.barangay}
                </p>
                <p>
                  {order?.shipping_address.city},{" "}
                  {order?.shipping_address.province}
                </p>
                <p>
                  {order?.shipping_address.postal_code},{" "}
                  {order?.shipping_address.region}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-end">
            <Button className="p-4 md:p-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium gap-2">
              Download Invoice
            </Button>

            <Button className="p-4 md:p-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium gap-2">
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
