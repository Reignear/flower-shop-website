import { useOrderByStatus } from "@/tanstack/fetch.hook";
import Order from "./order";
import { Card } from "@/components/ui/card";
import { useUserOrderDelivered } from "@/hooks/use-user-order-delivered";
import type { Order as OrderType, OrderItem } from "@/utils/interface";
import { Mosaic } from "react-loading-indicators";
import {
  Calendar,
  CalendarCheck2,
  ChevronRight,
  MapPin,
  Package,
  Star,
} from "lucide-react";
import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import { getStepperStatus } from "@/utils/status";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CustomSkeleton from "@/components/custom/custom-skeleton";
import { Textarea } from "@/components/ui/textarea";

const OrderDelivered = () => {
  const { imgLoaded, setImgLoaded } = useUserOrderDelivered();
  const { data: orders, isLoading: isOrdersLoading } =
    useOrderByStatus("delivered");
  console.log(orders);
  return (
    <Order>
      {orders?.map((order: OrderType, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:ring-2 ring-1 ring-emerald-200 hover:ring-emerald-500"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-start gap-4">
              {order.order_items.map((item: OrderItem, index: number) => (
                <div className="flex-0" key={index}>
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
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-5 h-5 text-emerald-600 flex--0" />
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
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">
                      ₱{order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="">
              <div className="px-6 py-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Order Status
                </p>
                <CustomOrderStepper status={getStepperStatus(order.status)} />
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 mt-1 flex" />
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
                    <Package className="w-5 h-5 text-emerald-400 mt-1 flex" />
                    <div>
                      <p className="text-xs text-gray-500">Reference</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                        {order.reference_number || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 col-span-2 md:col-span-1">
                    <MapPin className="w-4 h-4 text-emerald-400 mt-1 flex" />
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="text-sm font-mono font-medium text-gray-900 dark:text-white capitalize">
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 col-span-2 md:col-span-1">
                    <CalendarCheck2 className="w-4 h-4 text-emerald-400 mt-1 flex" />
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
            <div className="px-6 py-6  ">
              <div className="px-6 py-6 ">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                  Your Feedback
                </p>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">Rating</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < (order.feedback?.[0]?.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500">Feedback</p>
                    <Textarea
                      disabled
                      value={
                        order.feedback?.[0]?.feedback || "No feedback provided"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-4  dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 gap-3">
            <Button
              className={`bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-2 w-full`}
              disabled={order?.feedback?.length ? true : false}
            >
              <Link
                to={`/user/order/feedback/${order.id}`}
                className="w-full flex items-center justify-center"
              >
                {order?.feedback?.length ? (
                  <>
                    <span className="font-medium">Feedback Submitted</span> 
                  </>
                ) : (
                 <span className="flex items-center gap-2">Add Feedback <ChevronRight className="w-4 h-4" /></span>
                )}
              </Link>
            </Button>
          </div>
        </Card>
      ))}
      {isOrdersLoading && <CustomSkeleton type="order-card" />}
    </Order>
  );
};

export default OrderDelivered;
