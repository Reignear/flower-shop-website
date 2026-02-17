import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomOrderStepper } from "@/components/custom/custom-order-stepper";
import { ChevronRight, Package, MapPin, Calendar } from "lucide-react";
import type { Status } from "@/utils/types";

interface OrderCardProps {
  id: string;
  product: string;
  quantity: number;
  date: string;
  amount: string;
  status: Status;
  trackingNumber: string;
  image?: string;
  isExpanded?: boolean;
  onViewDetails?: () => void;
}

export function CustomOrderCard({
  id,
  product,
  quantity,
  date,
  amount,
  status,
  trackingNumber,
  image,
  onViewDetails,
}: OrderCardProps) {
  const getStepperStatus = (
    status: Status,
  ): "pending" | "on-going" | "ready-for-pick" | "completed" | "declined" => {
    if (status === "ready-for-pick") return "ready-for-pick";
    if (status === "on-going") return "on-going";
    if (status === "completed") return "completed";
    if (status === "declined") return "declined";
    return "pending";
  };

  const stepperStatus = getStepperStatus(status);

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg border-0 bg-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:ring-2 ring-1 ring-emerald-200 hover:ring-emerald-500
      `}
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-start gap-4">
          {image && (
            <div className="flex-0">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img src={image} alt={product} className="object-cover" />
              </div>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="w-5 h-5 text-emerald-600 flex--0" />
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    Order {id}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {product}
                </p>
                <div className="flex items-center gap-4">
                  <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
                    Qty: {quantity}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">{amount}</p>
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
                {date}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Package className="w-4 h-4 text-gray-400 mt-1 flex-0" />
            <div>
              <p className="text-xs text-gray-500">Tracking</p>
              <p className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                {trackingNumber}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2 col-span-2 md:col-span-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-0" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {status}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex gap-3">
        <Button
          onClick={onViewDetails}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium gap-2"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="flex-1">
          Track Order
        </Button>
      </div>
    </Card>
  );
}
