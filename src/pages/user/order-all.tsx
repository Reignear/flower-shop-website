import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import {
  ChevronRight,
  Package,
  MapPin,
  Calendar,
  CalendarCheck2,
} from "lucide-react";
import { Mosaic } from "react-loading-indicators";
import { useUserOrder } from "@/hooks/use-user-order";
import { getStepperStatus } from "@/utils/status";
import { Link } from "react-router-dom";
import { useOrder } from "@/tanstack/fetch.hook";
import type { Order as OrderType, OrderItem } from "@/utils/interface";
import Order from "./order";
import CustomSkeleton from "@/components/custom/custom-skeleton";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { orderBreadCrumb } from "@/data/user-order-data";

const OrderAll = () => {
  const { data: Orders, isLoading: isOrdersLoading } = useOrder();
  const { imgLoaded, setImgLoaded } = useUserOrder();

  return (
    <Order breadCrumbs={orderBreadCrumb}>
      {Orders?.map((order: OrderType, index: number) => (
        <Card
          key={index}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:ring-2 ring-1 ring-emerald-200 hover:ring-emerald-500"
        >
          <div className="px-4 md:px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-4">
              <div className="flex gap-2 md:gap-3 shrink-0">
                {order.order_items.map((item: OrderItem, index: number) => (
                  <div className="shrink-0" key={index}>
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
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 md:gap-3 mb-2">
                      <Package className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 shrink-0" />
                      <h3 className="font-semibold text-base md:text-lg text-gray-900 dark:text-white truncate">
                        Order: {order.reference_number || order.id}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {order.order_items.map((item, index) => (
                        <span key={item.id}>
                          {item.product.name}{" "}
                          {index < order.order_items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className="inline-block px-2 md:px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs md:text-base font-semibold rounded-full">
                        Qty:{" "}
                        {order.order_items.map((item, index) => (
                          <span key={index}>
                            {item.quantity}{" "}
                            {index < order.order_items.length - 1 ? " , " : ""}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xl md:text-2xl font-bold text-emerald-600">
                      ₱{order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Section */}
          <div className="px-4 md:px-6 py-4 md:py-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
              Order Status
            </p>
            <CustomOrderStepper status={getStepperStatus(order.status)} />
          </div>

          {/* Details Section */}
          <div className="px-4 md:px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="text-sm font-mono font-medium text-gray-900 dark:text-white truncate">
                    {order.order_date ? `${order.order_date}` : "No order date"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mt-1 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Reference</p>
                  <p className="text-sm font-mono font-medium text-gray-900 dark:text-white truncate">
                    {order.reference_number || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-sm font-mono font-medium text-gray-900 dark:text-white capitalize truncate">
                    {capitalizeFirstLetter(order.status)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarCheck2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Delivery Date</p>
                  <p className="text-sm font-mono font-medium text-gray-900 dark:text-white capitalize truncate">
                    {order.delivery_date
                      ? `${order.delivery_date}`
                      : "No delivery date"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="px-4 md:px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700  ">
            <Link
              to={`/user/order/${order.status}/${order.id}`}
              className="w-full"
            >
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-2 w-full">
                View Details
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      ))}
      {isOrdersLoading && <CustomSkeleton type="order-card" />}
      {Orders && Orders.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-sm">No orders found.</p>
        </div>
      )}
    </Order>
  );
};

export default OrderAll;
