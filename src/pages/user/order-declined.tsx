import { useDeclinedBreadCrumb } from "@/data/user-order-data";
import Order from "./order";
import CustomSkeleton from "@/components/custom/custom-skeleton";
import { Card } from "@/components/ui/card";
import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import { getStepperStatus } from "@/utils/status";
import { Calendar, CalendarCheck2, MapPin, Package } from "lucide-react";
import { Mosaic } from "react-loading-indicators";
import type { Order as OrderType, OrderItem } from "@/utils/interface";
import { useUserOrderDeclined } from "@/hooks/use-user-order-declined";
import { useOrderByStatus } from "@/tanstack/fetch.hook";

export default function OrderDecline() {
  const { data: orders, isLoading: isOrdersLoading } =
    useOrderByStatus("declined");
  const { imgLoaded, setImgLoaded } = useUserOrderDeclined();
  return (
    <Order breadCrumbs={useDeclinedBreadCrumb}>
      {orders?.map((order: OrderType, index: number) => (
        <Card
          key={index}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:ring-2 ring-1 ring-red-200 hover:ring-red-500"
        >
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex flex-wrap gap-2 md:gap-4">
                {order.order_items.map((item: OrderItem, index: number) => (
                  <div className="flex-0" key={index}>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {!imgLoaded && (
                        <div className="flex items-center justify-center p-2">
                          <Mosaic
                            color="#d7d7d7"
                            size="small"
                            text=""
                            textColor=""
                          />
                        </div>
                      )}

                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className={`object-cover ${!imgLoaded ? "hidden" : ""}`}
                        onLoad={() => setImgLoaded(true)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-emerald-600 shrink-0" />
                      <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white">
                        Order #{order.id}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {order.order_items.map(
                        (item: OrderItem, index: number) => (
                          <span key={item.id}>
                            {item.product.name}{" "}
                            {index < order.order_items.length - 1 ? ", " : ""}
                          </span>
                        ),
                      )}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
                        Qty:{" "}
                        {order.order_items.map(
                          (item: OrderItem, index: number) => (
                            <span key={index}>
                              {item.quantity}{" "}
                              {index < order.order_items.length - 1
                                ? " , "
                                : ""}
                            </span>
                          ),
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="text-left md:text-right mt-2 md:mt-0">
                    <p className="text-xl md:text-2xl font-bold text-emerald-600">
                      ₱{order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="">
              <div className="px-4 md:px-6 py-4 md:py-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Order Status
                </p>
                <CustomOrderStepper status={getStepperStatus(order.status)} />
              </div>

              <div className="px-4 md:px-6 py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                        {order.order_date
                          ? `${order.order_date}`
                          : "No order date"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Reference</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white break-all">
                        {order.reference_number || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white capitalize">
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarCheck2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Delivery Date</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white capitalize">
                        {order.delivery_date
                          ? `${order.delivery_date}`
                          : "No delivery date"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <div className="border rounded-lg p-4 md:p-5 border-red-500">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reason for Decline:{" "}
                </p>
                <p>- {order?.remarks || "No reason provided for decline."}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
      {isOrdersLoading && <CustomSkeleton type="order-card" />}
    </Order>
  );
}
