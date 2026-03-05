import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import CustomSkeleton from "@/components/custom/custom-skeleton";
import { Card } from "@/components/ui/card";
import { useCancelledBreadCrumb } from "@/data/user-order-data";
import { useUserOrderCancelled } from "@/hooks/use-user-order-cancelled";
import Order from "@/pages/user/order";
import { useOrderByStatus } from "@/tanstack/fetch.hook";
import type { Order as OrderType, OrderItem } from "@/utils/interface";
import { getStepperStatus } from "@/utils/status";
import { Calendar, CalendarCheck2, MapPin, Package } from "lucide-react";
import { Mosaic } from "react-loading-indicators";

export default function OrderCancelled() {
  const { data: orders, isLoading: isOrdersLoading } =
    useOrderByStatus("cancelled");
  const { imgLoaded, setImgLoaded } = useUserOrderCancelled();
  return (
    <Order breadCrumbs={useCancelledBreadCrumb}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {orders?.map((order: OrderType, index: number) => (
          <Card
            key={index}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:ring-2 ring-1 ring-red-200 hover:ring-red-500"
          >
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {order.order_items.map((item: OrderItem, index: number) => (
                    <div className="shrink-0" key={index}>
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                <div className="flex-1 w-full">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-emerald-600 shrink-0" />
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
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
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-bold text-emerald-600">
                        ₱{order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="px-6 py-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Order Status
                </p>
                <CustomOrderStepper status={getStepperStatus(order.status)} />
              </div>

              <div className="px-6 py-4">
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
                    <Package className="w-5 h-5 text-emerald-400 mt-1 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Reference</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
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
          </Card>
        ))}
      </div>
      {isOrdersLoading && <CustomSkeleton type="order-card" />}
    </Order>
  );
}
