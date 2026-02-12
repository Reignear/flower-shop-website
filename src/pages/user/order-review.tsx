/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {  useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAddress } from "@/tanstack/fetch.hook";
import type { Address } from "@/utils/interface";
import { Checkbox } from "@/components/ui/checkbox";
import Skeleton from "react-loading-skeleton";

export default function OrderReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, subtotal, shippingFee, total } = location.state || {};
  const { data: address, isLoading: isAddressLoading } = useAddress();
  console.log("Order Review Data:", { items, subtotal, shippingFee, total });
  const orderData = {
    items: [
      {
        id: 1,
        name: "Blue Rose Bouquet",
        quantity: 1,
        price: 199,
        image: "/images/image.png",
      },
      {
        id: 2,
        name: "Premium Gift Wrapping",
        quantity: 1,
        price: 49,
        image:
          "https://images.unsplash.com/photo-1513201099205-b0a265347acf?w=200&h=200&fit=crop",
      },
    ],
    subtotal: 248,
    shipping: 50,
    tax: 0.0,
    total: 327.8,
    shippingAddress: {
      name: "Maria Santos",
      street: "123 Flower Street",
      city: "Manila, Metro Manila",
      postal: "1200",
      country: "Philippines",
    },
    paymentMethod: "Credit Card - Visa ending in 4242",
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
      <form action="">
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
                          <p className="font-semibold text-gray-900 text-sm">
                            ₱{item.product_id.price.toFixed(2)}
                          </p>
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
                  {address?.map((addr: Address, index) => (
                    <div key={index}>
                      <div className="flex justify-between">
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

                        <div>
                          <Checkbox className="border-black " />
                        </div>
                      </div>
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
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Standard delivery: 3-5 business days
                </p>
              </Card>

              {/* Payment Method */}
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 font-medium text-sm">
                    {orderData.paymentMethod}
                  </p>
                </div>
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
                    <span>₱{shippingFee.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-8">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₱{total.toFixed(2)}
                  </span>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mb-1">
                  Place Order
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </form>
    </div>
  );
}
