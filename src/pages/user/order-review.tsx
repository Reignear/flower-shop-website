import { ChevronLeft, Truck, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function OrderReview() {
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
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm">
            <ChevronLeft size={18} />
            Back to Cart
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
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
                {orderData.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-0 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900 text-sm">
                          ₱{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {index < orderData.items.length - 1 && (
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
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 text-sm mb-2">
                  {orderData.shippingAddress.name}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  {orderData.shippingAddress.street}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  {orderData.shippingAddress.city}{" "}
                  {orderData.shippingAddress.postal}
                </p>
                <p className="text-gray-700 text-sm">
                  {orderData.shippingAddress.country}
                </p>
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
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                  <Edit2 size={16} />
                  Edit
                </button>
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
                  <span>₱{orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Shipping</span>
                  <span>₱{orderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Tax</span>
                  <span>₱{orderData.tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-8">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₱{orderData.total.toFixed(2)}
                </span>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mb-1">
                Confirm Order
              </Button>
              <Link to="/user/products" prefetch="viewport">
                <button className="w-full border border-gray-300 text-gray-900 font-medium py-2 rounded-lg hover:bg-gray-50 hover:cursor-pointer transition-colors text-sm">
                  Continue Shopping
                </button>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
