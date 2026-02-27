import AdminLayout from "@/components/layout/admin-layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDeclinedBreadCrumb } from "@/data/admin-order-data";
import { useOrderById } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { formatDashText } from "@/utils/dash-formatter";
import { formatDate } from "@/utils/date";
import type { OrderItem } from "@/utils/interface";
import { getStatusBadgeColor } from "@/utils/status";
import { useParams } from "react-router-dom";

export default function OrderDeclinedView() {
  const { id: id } = useParams();
  const { data: Order } = useOrderById(Number(id));

  return (
    <AdminLayout breadCrumbs={useDeclinedBreadCrumb()}>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Reference No.{Order?.reference_number}
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage order details and status
            </p>
          </div>
          <Badge
            className={`${getStatusBadgeColor(Order?.status)} border-0 px-4 py-2 text-base`}
          >
            {formatDashText(capitalizeFirstLetter(Order?.status))}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Customer Information
              </h3>
              <Separator />
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-foreground font-semibold mt-1">
                    {capitalizeFirstLetter(Order?.user.first_name)}{" "}
                    {capitalizeFirstLetter(Order?.user.middle_name)}{" "}
                    {capitalizeFirstLetter(Order?.user.last_name)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Delivery Location
                  </p>
                  <p className="text-foreground font-semibold mt-1">
                    {Order?.shipping_address?.barangay}
                    {", "}
                    {Order?.shipping_address?.city}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Order Items
              </h3>
              <Separator />
              <div className="space-y-4">
                {Order?.order_items.map((item: OrderItem) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between pb-4 border-b border-border last:border-0"
                  >
                    <div className="flex gap-2">
                      <div>
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">
                      ₱{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between pt-4">
                <p className="font-semibold text-foreground">Total Amount:</p>
                <p className="text-2xl font-bold text-primary">
                  ₱{Order?.total_amount.toLocaleString()}
                </p>
              </div>
            </Card>

            {/* Order Timeline */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Timeline
              </h3>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary mt-2 flex-0" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Order Placed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(Order?.order_date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-muted mt-2 flex-0" />
                  <div>
                    <p className="font-semibold text-foreground">
                      Expected Delivery
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(Order?.delivery_date)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Admin Remarks
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {Order?.remarks || "No feedback provided for this order."}
                </p>
              </div>
              <Separator />
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
