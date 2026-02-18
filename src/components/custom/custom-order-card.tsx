import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import { ChevronRight, Package, MapPin, Calendar } from "lucide-react";
import type { Order } from "@/utils/interface";
import { Mosaic } from "react-loading-indicators";
import { useUserOrder } from "@/hooks/use-user-order";
import { getStepperStatus } from "@/utils/status";
import { Link } from "react-router-dom";

interface OrderCardProps {
  order: Order;
}

export function CustomOrderCard({ order }: OrderCardProps) {
  const { imgLoaded, setImgLoaded } = useUserOrder();
  const stepperStatus = getStepperStatus(order.status);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:ring-2 ring-1 ring-emerald-200 hover:ring-emerald-500">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-start gap-4">
          {order.order_items_table.map((item, index) => (
            <div className="flex-0" key={index}>
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                {!imgLoaded && (
                  <div className="flex items-center justify-center p-2">
                    <Mosaic color="#d7d7d7" size="small" text="" textColor="" />
                  </div>
                )}

                <img
                  src={item.product_id.image_url}
                  alt={item.product_id.name}
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
                  {order.order_items_table.map((item, index) => (
                    <span key={item.id}>
                      {item.product_id.name}{" "}
                      {index < order.order_items_table.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <div className="flex items-center gap-4">
                  <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
                    Qty:{" "}
                    {order.order_items_table.map((item, index) => (
                      <span key={index}>
                        {item.quantity}{" "}
                        {index < order.order_items_table.length - 1
                          ? " , "
                          : ""}
                      </span>
                    ))}
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

      {/* Stepper Section */}
      <div className="px-6 py-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Order Status
        </p>
        <CustomOrderStepper status={stepperStatus} />
      </div>

      {/* Details Section */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-gray-400 mt-1 flex-0" />
            <div>
              <p className="text-xs text-gray-500">Order Date</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {order.order_date}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Package className="w-4 h-4 text-gray-400 mt-1 flex-0" />
            <div>
              <p className="text-xs text-gray-500">Reference</p>
              <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                {order.reference_number || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 col-span-2 md:col-span-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-0" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {order.status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-3">
        <Link to={`/user/order/${order.id}`} className="w-full">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-2 w-full">
            View Details
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>

        <Button variant="outline" className="w-full">
          Track Order
        </Button>
      </div>
    </Card>
  );
}
