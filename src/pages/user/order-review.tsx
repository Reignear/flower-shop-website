/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, ChevronLeft, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAddress, useBillingMethod } from "@/tanstack/fetch.hook";
import type { Address } from "@/utils/interface";
import Skeleton from "react-loading-skeleton";
import { CODLogo } from "@/components/icons/COD";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import { BankLogo } from "@/components/icons/Bank";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrderPreview } from "@/hooks/use-user-order-preview";
import { Controller } from "react-hook-form";
import { CustomToast } from "@/components/custom/custom-toast";
import { useInsertOrder } from "@/tanstack/order-mutation";
import { Toaster } from "react-hot-toast";
import { useDeleteCart } from "@/tanstack/cart.mutation";
import { Calendar } from "@/components/ui/calendar";
import { getDateOnly } from "@/utils/date-formatter";

export default function OrderReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, subtotal, shippingFee, total } = location.state || {};
  const { data: address, isLoading: isAddressLoading } = useAddress();
  const { data: paymentMethod, isLoading: isPaymentMethodLoading } =
    useBillingMethod();

  const subTotalPerItem = (item: any) => {
    return item.quantity * item.product_id.price;
  };
  const { control, handleSubmit, errors, date } = useOrderPreview();
  const insertOrderMutation = useInsertOrder();
  const deleteCartMutation = useDeleteCart();

  const onSubmit = async (data: any) => {
    try {
      await CustomToast(
        insertOrderMutation.mutateAsync({
          data: items,
          shipping_fee: shippingFee,
          total: total,
          delivery_date: date ? getDateOnly(date) : getDateOnly(new Date()),
          billing_method_id: Number(data.billing_method_id),
          user_address_id: Number(data.user_address_id),
        }),
        "insert",
      );

      await Promise.all(
        items.map((item: any) => deleteCartMutation.mutateAsync(item.id)),
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/user/order");
    } catch (error) {
      console.log("Error in placing order", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant={"link"} onClick={() => navigate(-1)}>
            <ChevronLeft size={18} />
            Back
          </Button>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Toaster position="bottom-right" />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Review Your Order
            </h1>
            <p className="text-gray-600">
              Verify everything before confirming your purchase
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Items & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card className="p-6 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Order Items
                </h2>
                <div className="space-y-5">
                  {items?.map((item: any, index: number) => (
                    <div key={index}>
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg ">
                          <img
                            src={item.product_id.image_url}
                            alt={item.product_id.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {item.product_id.name}
                            </h3>
                            <p className="text-xs text-gray-600 mt-1">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-gray-900 text-sm">
                              ₱{item.product_id.price.toFixed(2)}
                            </p>

                            <p className="font-semibold text-gray-900 text-sm">
                              <span className="text-xs font-normal text-gray-600 mt-1">
                                Sub total per item{" "}
                              </span>
                              ₱{subTotalPerItem(item).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < items.length - 1 && (
                        <Separator className="mt-5" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Shipping Address */}
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Truck size={20} className="text-blue-600" />
                    <h2 className="text-lg font-bold text-gray-900">
                      Shipping To
                    </h2>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Controller
                    name="user_address_id"
                    control={control}
                    rules={{ required: "Please select an address" }}
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {address?.map((addr: Address) => (
                          <div key={addr.id}>
                            <label htmlFor={`${addr.id}`}>
                              <div className="flex justify-between items-start cursor-pointer">
                                <div>
                                  <p className="font-semibold text-gray-900 text-sm mb-2">
                                    Purok {addr.address_line1}
                                  </p>
                                  <p className="text-gray-700 text-sm mb-1">
                                    {addr.address_line2}
                                  </p>
                                  <p className="text-gray-700 text-sm mb-1">
                                    {addr.city} {addr.postal_code}
                                  </p>
                                  <p className="text-gray-700 text-sm">
                                    {addr.province} {addr.region}
                                  </p>
                                </div>

                                <RadioGroupItem
                                  value={`${addr.id}`}
                                  id={`${addr.id}`}
                                />
                              </div>
                            </label>
                            <Separator className="my-2" />
                          </div>
                        ))}
                        {isAddressLoading && (
                          <div className="space-y-3">
                            {Array.from({ length: 2 }).map((_, index) => (
                              <div
                                key={index}
                                className="bg-gray-200 w-full h-20 rounded-lg skeleton-effect"
                              >
                                <Skeleton width="100%" height={80} />
                              </div>
                            ))}
                          </div>
                        )}
                      </RadioGroup>
                    )}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Standard delivery: 3-5 business days
                </p>
                {errors.user_address_id && (
                  <p className="text-xs text-center text-red-500 mt-2">
                    {errors.user_address_id.message as string}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <CalendarDays size={20} className="text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Shipping Date
                  </h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Controller
                    name="delivery_date"
                    control={control}
                    rules={{ required: "Please select a delivery date" }}
                    render={({ field }) => (
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-lg border w-full"
                        captionLayout="dropdown"
                      />
                    )}
                  />
                  {errors.delivery_date && (
                    <p className="text-xs text-center text-red-500 mt-2">
                      {errors.delivery_date.message as string}
                    </p>
                  )}
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>
                <Controller
                  name="billing_method_id"
                  control={control}
                  rules={{ required: "Please select a payment method" }}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-2 gap-2"
                    >
                      {paymentMethod?.map((method: any, index: number) => (
                        <div key={index} className="border p-2 rounded-lg flex">
                          <div>
                            {!isPaymentMethodLoading &&
                              method.method_type === "gcash" && (
                                <>
                                  <fieldset
                                    disabled={method.is_available === false}
                                  >
                                    <label
                                      htmlFor="gcash"
                                      className={`${method.is_available === false ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
                                    >
                                      <div className="flex gap-2 items-center">
                                        <RadioGroupItem
                                          value={method.id}
                                          id="gcash"
                                        />
                                        <span className="p-1 px-5 bg-gray-100 rounded-full font-bold">
                                          {capitalizeFirstLetter(
                                            method.method_type,
                                          )}
                                        </span>
                                      </div>

                                      <div className="flex items-center p-5 gap-2">
                                        <img
                                          src="/assets/images/billing-icons/gcash.svg"
                                          alt="GCash Logo"
                                          className="h-13 w-13"
                                        />
                                        <div>
                                          <p className="font-semibold text-sm">
                                            {method.gcash_name || "N/A"}
                                          </p>

                                          <p className="font-mono text-sm">
                                            {method.gcash_number || "N/A"}
                                          </p>
                                        </div>
                                      </div>
                                    </label>{" "}
                                  </fieldset>
                                </>
                              )}
                            {!isPaymentMethodLoading &&
                              method.method_type === "cod" && (
                                <>
                                  <fieldset
                                    disabled={method.is_available === false}
                                  >
                                    <label
                                      htmlFor="cod"
                                      className={`${method.is_available === false ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
                                    >
                                      <div className="flex gap-2 items-center">
                                        <RadioGroupItem
                                          value={method.id}
                                          id="cod"
                                        />
                                        <span className="p-1 px-5 bg-gray-100 rounded-full font-bold">
                                          {capitalizeFirstLetter(
                                            method.method_type,
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex items-center p-5 gap-2">
                                        <CODLogo />
                                        <div>
                                          <p className="font-semibold text-sm">
                                            Cash on Delivery
                                          </p>
                                        </div>
                                      </div>
                                    </label>
                                  </fieldset>
                                </>
                              )}
                            {!isPaymentMethodLoading &&
                              method.method_type === "paypal" && (
                                <>
                                  <fieldset
                                    disabled={method.is_available === false}
                                  >
                                    <label
                                      htmlFor="paypal"
                                      className={`${method.is_available === false ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
                                    >
                                      <div className="flex gap-2 items-center">
                                        <RadioGroupItem
                                          value={method.id}
                                          id="paypal"
                                        />
                                        <span className="p-1 px-5 bg-gray-100 rounded-full font-bold">
                                          {capitalizeFirstLetter(
                                            method.method_type,
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex items-center p-5 gap-2">
                                        <img
                                          src="/assets/images/billing-icons/paypal.svg"
                                          alt="PayPal Logo"
                                          className="h-13 w-13"
                                        />
                                        <p className="text-sm">
                                          {method.paypal_email || "N/A"}
                                        </p>
                                      </div>
                                    </label>
                                  </fieldset>
                                </>
                              )}
                            {!isPaymentMethodLoading &&
                              method.method_type === "bank" && (
                                <>
                                  <fieldset
                                    disabled={method.is_available === false}
                                  >
                                    <label
                                      htmlFor="bank"
                                      className={`${method.is_available === false ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
                                    >
                                      <div className="flex gap-2 items-center">
                                        <RadioGroupItem
                                          value={method.id}
                                          id="bank"
                                        />
                                        <span className="p-1 px-5 bg-gray-100 rounded-full font-bold">
                                          {capitalizeFirstLetter(
                                            method.method_type,
                                          )}
                                        </span>
                                      </div>
                                      <div className="flex items-center p-5 gap-2">
                                        <BankLogo />
                                        <div>
                                          <p className="font-semibold text-base">
                                            {method.bank_name || "N/A"}
                                          </p>
                                          <p className="font-mono text-sm">
                                            {method.bank_account_number ||
                                              "N/A"}
                                          </p>

                                          <p className="font-mono text-sm">
                                            {method.bank_account_name || "N/A"}
                                          </p>
                                        </div>
                                      </div>
                                    </label>
                                  </fieldset>
                                </>
                              )}
                          </div>
                        </div>
                      ))}{" "}
                    </RadioGroup>
                  )}
                />

                {isPaymentMethodLoading && (
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 w-full h-40 rounded-lg skeleton-effect "
                      >
                        <Skeleton width={300} />
                      </div>
                    ))}
                  </div>
                )}
                {errors.billing_method_id && (
                  <p className="text-xs text-center text-red-500 mt-2">
                    {errors.billing_method_id.message as string}
                  </p>
                )}
              </Card>
            </div>

            {/* Right Column - Order Summary & CTA */}
            <div className="lg:col-span-1">
              <Card className="p-6 border border-gray-200 sticky top-28">
                <h2 className="text-lg font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Shipping</span>
                    <span>
                      {subtotal > 500 ? (
                        <span>FREE</span>
                      ) : (
                        `₱ ${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>{" "}
                  {subtotal > 500 && (
                    <p className="text-xs text-muted-foreground font-medium">
                      🎉 Free shipping on orders over ₱ 500 and within Sto Tomas
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-8">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₱{total.toFixed(2)}
                  </span>
                </div>

                <Button
                  disabled={insertOrderMutation.isPending}
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mb-1"
                >
                  {insertOrderMutation.isPending
                    ? "Processing..."
                    : "   Place Order "}
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}
