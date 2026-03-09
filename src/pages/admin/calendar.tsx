/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomCalendar } from "@/components/custom/custom-calendar";
import AdminLayout from "@/components/layout/admin-layout";
import { useDeliveryData } from "@/tanstack/fetch.hook";
import { Badge } from "@/components/ui/badge";
import {
  calendarBreadcrumbs,
  statusColorLabel,
} from "@/data/admin-calendar-data";

export default function Calendar() {
  const { data: deliveryData } = useDeliveryData();
  console.log("Delivery Data:", deliveryData);
  return (
    <AdminLayout
      breadCrumbs={calendarBreadcrumbs}
      className="w-full space-y-4 p-4 overflow-hidden"
    >
      <div>
        <h1 className="md:text-3xl text-xl font-bold">Calendar</h1>
        <p className="text-muted-foreground text-xs md:text-sm">
          A Calendar that shows upcoming order delivery.
        </p>
      </div>
      <div className="h-110 border rounded-lg shadow-sm w-full">
        <div className="h-full">
          <CustomCalendar
            events={deliveryData}
            onDateSelect={(date: any) => console.log("Selected date:", date)}
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="grid grid-cols-3 md:flex gap-4">
          {statusColorLabel.map((status, index) => (
            <div
              key={index}
              className="flex md:text-base text-sm gap-1 items-center justify-center"
            >
              <Badge
                className={`${status.color} rounded-full h-3 w-3 p-0`}
              ></Badge>
              {status.label}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
