import { Check, X } from "lucide-react";
import type { Status } from "@/utils/types";

interface OrderStepperProps {
  status: Status;
}

export function CustomOrderStepper({ status }: OrderStepperProps) {
  const isDeclined = status === "declined";
  const isCancelled = status === "cancelled";
  const isNegative = isDeclined || isCancelled;

  const steps: { key: Status; label: string; description: string }[] = [
    { key: "pending", label: "Pending", description: "Order placed" },
    {
      key: "on-process",
      label: isNegative
        ? isCancelled
          ? "Cancelled"
          : "Declined"
        : "On Process",
      description: isNegative
        ? isCancelled
          ? "Order cancelled"
          : "Order declined"
        : "Being prepared",
    },
    { key: "for-pickup", label: "For Pick", description: "Ready" },
    { key: "delivered", label: "Delivered", description: "Delivered" },
  ];

  const currentStepIndex = isNegative
    ? 1
    : steps.findIndex((step) => step.key === status);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = !isNegative && index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isNegativeStep = isNegative && index === 1;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center flex-1 w-full">
                <div
                  className={`flex items-center justify-center md:w-12 md:h-12 h-8 w-8 rounded-full font-bold text-sm transition-all duration-300 ${
                    isNegativeStep
                      ? "bg-red-500 text-white shadow-lg scale-110"
                      : isCompleted || isCurrent
                        ? "bg-emerald-500 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isNegativeStep ? (
                    <X className="md:w-6 md:h-6 h-4 w-4" />
                  ) : isCompleted ? (
                    <Check className="md:w-6 md:h-6 h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-3 md:mx-2">
                    <div
                      className={`h-full rounded transition-all duration-300 ${
                        isNegative && index < currentStepIndex
                          ? "bg-red-500"
                          : isCompleted
                            ? "bg-emerald-500"
                            : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>

              {/* Step Label */}
              <div className="text-center mt-3 w-full">
                <p
                  className={`font-semibold text-xs md:text-sm ${
                    isNegativeStep
                      ? "text-red-600"
                      : isCurrent
                        ? "text-emerald-600"
                        : isCompleted
                          ? "text-emerald-500"
                          : "text-gray-600"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-[10px] text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
