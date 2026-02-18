import { Check, X } from "lucide-react";
import type { Status } from "@/utils/types";
interface OrderStepperProps {
  status: Status;
}

export function CustomOrderStepper({ status }: OrderStepperProps) {
  const isDeclined = status === "declined";

  const steps: { key: Status; label: string; description: string }[] = [
    { key: "pending", label: "Pending", description: "Order placed" },
    {
      key: isDeclined ? "declined" : "on-going",
      label: isDeclined ? "Declined" : "On-going",
      description: isDeclined ? "Order declined" : "Being prepared",
    },
    { key: "ready-for-pick", label: "Ready for Pick", description: "Ready" },
    { key: "completed", label: "Completed", description: "Delivered" },
  ];

  const currentStepIndex = isDeclined
    ? 1
    : steps.findIndex((step) => step.key === status);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = !isDeclined && index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isDeclinedStep = isDeclined && index === 1;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center flex-1 w-full">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all duration-300 ${
                    isDeclinedStep
                      ? "bg-red-500 text-white shadow-lg scale-110"
                      : isCompleted || isCurrent
                        ? "bg-emerald-500 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {isDeclinedStep ? (
                    <X className="w-6 h-6" />
                  ) : isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2">
                    <div
                      className={`h-full rounded transition-all duration-300 ${
                        isDeclined && index <= 1
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
                  className={`font-semibold text-sm ${
                    isDeclinedStep
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
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
