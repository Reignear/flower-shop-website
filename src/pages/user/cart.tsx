/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserLayout from "@/components/layout/user-layout";
import { cartBreadCrumb } from "@/data/user-cart-data";
import Skeleton from "react-loading-skeleton";
import { useCart } from "@/tanstack/fetch.hook";
import { useUserCart } from "@/hooks/use-user-cart";
import { Mosaic } from "react-loading-indicators";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDeleteCart } from "@/tanstack/cart.mutation";
import { CustomToast } from "@/components/custom/custom-toast";

export default function Cart() {
  const { data: CartData, isLoading } = useCart();
  const { imgLoaded, setImgLoaded, data, setData } = useUserCart();

  useEffect(() => {
    if (CartData) {
      setData(CartData);
    }
  }, [CartData]);
  const subtotal =
    data?.reduce(
      (acc: number, item: any) => acc + item.product_id.price * item.quantity,
      0,
    ) || 0;

  const shippingFee = 50.0;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setData(
      data.map((item: any) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };
  const removeItem = (id: string) => {
    setData(data.filter((item: any) => item.id !== id));
  };

  const deleteMutation = useDeleteCart();

  const deleteCartItem = async (cart_id: number) => {
    try {
      CustomToast(deleteMutation.mutateAsync(cart_id), "delete");
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <UserLayout breadCrumbs={cartBreadCrumb}>
      <Toaster />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 w-full h-45 rounded-lg skeleton-effect "
                >
                  <Skeleton width={100} />
                </div>
              ))}
            </div>
            <div className="bg-gray-200 w-full h-96 rounded-lg skeleton-effect col-span-1">
              <Skeleton width={100} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <div className="grid gap-8 cols-span-1">
                <div className="space-y-4">
                  {data?.map((item: any) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        <div className="rounded-lg  flex items-center justify-center">
                          {!imgLoaded && (
                            <Mosaic color="#d5d5d5" size="small" />
                          )}
                          <img
                            src={item.product_id.image_url}
                            alt={item.product_id.name}
                            className={`h-24 w-24 object-cover rounded-lg ${imgLoaded ? "" : "hidden"}`}
                            onLoad={() => setImgLoaded(true)}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {item.product_id.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Description: {item.product_id.description}
                            </p>
                            <p className="mt-1 text-lg font-bold ">
                              ₱ {item.product_id.price.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-1">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="rounded p-1 hover:bg-muted transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4 text-foreground" />
                            </button>
                            <span className="w-8 text-center font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="rounded p-1 hover:bg-muted transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4 text-foreground" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => deleteCartItem(item.id)}
                            className="mt-2 rounded p-2 text-destructive hover:bg-red-50 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-3 border-t border-border pt-3 text-right">
                        <p className="text-sm text-muted-foreground">
                          Subtotal:{" "}
                          <span className="font-semibold text-foreground">
                            ₱
                            {(item.product_id.price * item.quantity).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card
                className={`sticky top-8 border border-border bg-card p-6 shadow-sm ${data.length <= 0 && !isLoading ? "hidden" : ""}`}
              >
                <h2 className="mb-6 text-xl font-bold text-foreground">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between">
                    <span className="">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ₱ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="">Shipping</span>
                    <span className="font-semibold text-foreground">
                      {subtotal > 500 ? (
                        <span>FREE</span>
                      ) : (
                        `₱ ${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {subtotal > 500 && (
                    <p className="text-xs text-muted-foreground font-medium">
                      🎉 Free shipping on orders over ₱ 500 and within Sto Tomas
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <span className="text-lg font-bold text-foreground">
                    Total
                  </span>
                  <span className="text-2xl font-bold">
                    ₱{" "}
                    {(subtotal + (subtotal > 500 ? 0 : shippingFee)).toFixed(2)}
                  </span>
                </div>
                <Link
                  to="/user/order/review"
                  state={{
                    items: data,
                    subtotal: subtotal,
                    shippingFee: subtotal > 500 ? 0 : shippingFee,
                    total: subtotal + (subtotal > 500 ? 0 : shippingFee),
                  }}
                >
                  <Button className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-semibold">
                    Proceed to Checkout
                  </Button>
                </Link>
                <div className="mt-6 rounded-lg bg-muted/50 p-4">
                  <p className="text-xs text-muted-foreground">
                    ✨ All our flowers are self-made and delivered with care
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {data.length <= 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 py-16">
            <p className="text-xl font-semibold text-muted-foreground">
              Your cart is empty
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add some beautiful flowers to get started!
            </p>
            <Link to="/user/products">
              <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>
    </UserLayout>
  );
}
