/* eslint-disable @typescript-eslint/no-explicit-any */
import UserLayout from "@/components/layout/user-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useOrderById } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { formatDate } from "@/utils/date";
import type { OrderItem } from "@/utils/interface";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import { useUserOrderFeedback } from "@/hooks/use-user-order-feedback";
import { useInsertFeedback } from "@/tanstack/feedback.mutation";
import { CustomToast } from "@/components/custom/custom-toast";
import { Toaster } from "react-hot-toast";

const OrderFeedback = () => {
  const { id: id } = useParams();
  const { data: order } = useOrderById(Number(id));

  const {
    handleSubmit,
    orderFeedback,
    setOrderFeedback,
    orderRating,
    setOrderRating,
    productFeedback,
    setProductFeedback,
  } = useUserOrderFeedback();

  // Handle star click
  const handleRating = (itemId: number, rating: number) => {
    setProductFeedback((prev: any) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        rating,
      },
    }));
  };

  // Handle feedback text change
  const handleProductFeedback = (itemId: number, feedback: string) => {
    setProductFeedback((prev: any) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        feedback,
      },
    }));
  };

  // Handle order rating
  const handleOrderRating = (rating: number) => {
    setOrderRating(rating);
  };

  const insertFeedbackMutation = useInsertFeedback();

  const onSubmit = async () => {
    try {
      CustomToast(
        insertFeedbackMutation.mutateAsync({
          order_id: order?.id,
          order_rating: orderRating,
          feedback: orderFeedback,
          order_items: order?.order_items.map((item: OrderItem) => ({
            product_id: item.product.id,
            rating: productFeedback[item.id]?.rating || 0,
            feedback: productFeedback[item.id]?.feedback || "",
          })),
        }),
      );
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  return (
    <UserLayout>
      <Toaster position="bottom-right" />
      <div className="p-5">
        <div className="grid grid-cols-3 gap-5 ">
          <div className="space-y-5 col-span-1">
            <Card className="h-fit sticky top-5">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>View your order information</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Order ID and Status */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Order Ref No.
                    </span>
                    <span className="font-mono text-sm font-semibold">
                      {order?.reference_number || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Status
                    </span>
                    <Badge className="px-3 py-1 bg-emerald-600">
                      {capitalizeFirstLetter(order?.status)}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Order Date and Total */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Order Date
                    </span>
                    <span className="text-sm">
                      {formatDate(order?.order_date)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Order Total
                    </span>
                    <span className="text-lg font-bold">
                      ${order?.total_amount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Products Summary */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">
                    Products ({order?.order_items.length})
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {order?.order_items.map((item: OrderItem) => (
                      <div
                        key={item.id}
                        className="flex gap-3 rounded-lg bg-muted/50 p-3"
                      >
                        <div>
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × ₱{item.unit_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Feedback sectino here */}
          <div className="space-y-5 col-span-2">
            <div>
              <h1 className="text-lg font-semibold">Feedback</h1>
              <p className="text-muted-foreground text-sm">
                Share your feedback for the order and for each product
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Card>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label>Service Feedback</Label>
                    <div className="flex mb-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={24}
                          className={`cursor-pointer ${
                            orderRating > index
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleOrderRating(index + 1)}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Share your honest feedback about your order experience
                    </p>
                  </div>
                  <Textarea
                    value={orderFeedback}
                    onChange={(e) => setOrderFeedback(e.target.value)}
                    required
                  />
                </CardContent>
              </Card>
              <div className="space-y-5">
                {order?.order_items.map((item: OrderItem) => (
                  <Card key={item?.id}>
                    <CardHeader>
                      <div className="flex gap-2 items-start">
                        <div>
                          <img
                            src={item?.product.image_url}
                            alt={item?.product.name}
                            className="w-15 h-15 rounded-lg object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <CardTitle>{item?.product.name}</CardTitle>
                          <CardDescription>
                            {item?.quantity} × ₱{item?.unit_price.toFixed(2)}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Your Rating
                        </Label>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              size={24}
                              className={`cursor-pointer ${
                                productFeedback[item.id]?.rating > index
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              onClick={() => handleRating(item.id, index + 1)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Your Feedback
                        </Label>
                        <Textarea
                          value={productFeedback[item.id]?.feedback || ""}
                          onChange={(e) =>
                            handleProductFeedback(item.id, e.target.value)
                          }
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex gap-3 justify-end sticky bottom-5">
                <Button
                  type="reset"
                  variant="outline"
                  onClick={() => {
                    setOrderFeedback("");
                    setProductFeedback({});
                  }}
                  disabled={insertFeedbackMutation.isPending}
                >
                  Clear All
                </Button>
                <Button
                  type="submit"
                  disabled={insertFeedbackMutation.isPending}
                >
                  {insertFeedbackMutation.isPending
                    ? "Submitting Feedback..."
                    : "Submit Feedback"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default OrderFeedback;
