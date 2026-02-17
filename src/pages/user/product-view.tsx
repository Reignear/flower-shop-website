/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useProductID } from "@/tanstack/fetch.hook";
import { ShoppingCart, Star, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import type { Feedback, Product } from "@/utils/interface";
import Skeleton from "react-loading-skeleton";
import { OrbitProgress } from "react-loading-indicators";
import { useUserProductView } from "@/hooks/use-user-product-view";
import { formatDate } from "@/utils/date";
import { averageRating } from "@/utils/rating";
import { useInsertCart } from "@/tanstack/cart.mutation";
import { Toaster } from "react-hot-toast";
import UserLayout from "@/components/layout/user-layout";
import { useProductViewBreadCrumb } from "@/data/user-product-view-data";
import { CustomToast } from "@/components/custom/custom-toast";
export default function ProductView() {
  const { id: productId } = useParams();
  const { data: product, isLoading: isProductLoading } = useProductID(
    Number(productId),
  );
  const { imgLoaded, setImgLoaded, quantity, setQuantity } =
    useUserProductView();

  const insertCartMutation = useInsertCart();

  const handleAddToCart = async () => {
    try {
      await CustomToast(
        insertCartMutation.mutateAsync({
          product_id: Number(productId),
          quantity,
        }),
        "insert",
      );
    } catch (error) {
      console.log("Error adding to cart", error);
    }
  };

  return (
    <UserLayout breadCrumbs={useProductViewBreadCrumb()}>
      <Toaster position="bottom-right" />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white flex items-center justify-center">
              {!imgLoaded && (
                <OrbitProgress
                  variant="spokes"
                  dense
                  color="#b2b2b2"
                  size="medium"
                />
              )}
              <img
                src={product?.image_url}
                alt={product?.name}
                className={`h-full w-full object-cover ${imgLoaded ? "" : "hidden"}`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                {isProductLoading ? (
                  <div className="bg-gray-200 w-25 h-4 rounded-lg skeleton-effect ">
                    <Skeleton width={300} />
                  </div>
                ) : (
                  <Badge variant="secondary">
                    {capitalizeFirstLetter(product?.status)}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isProductLoading ? (
                  <div className="bg-gray-200 w-72 h-8 rounded-lg skeleton-effect ">
                    <Skeleton width={300} />
                  </div>
                ) : (
                  product?.name
                )}
              </h1>
              {isProductLoading ? (
                <div className="mt-4 bg-gray-200 w-40 h-8 rounded-lg skeleton-effect ">
                  <Skeleton width={300} />
                </div>
              ) : (
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i <
                          Math.floor(
                            averageRating(
                              product?.feedback?.map((f: any) => f.rating) ||
                                [],
                            ),
                          )
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product?.feedback?.length} reviews)
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                {isProductLoading ? (
                  <div className="bg-gray-200 w-20 h-8 rounded-lg skeleton-effect ">
                    <Skeleton width={100} />
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ₱{product?.price}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={
                      product?.status !== "available" ||
                      insertCartMutation.isPending
                    }
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-medium">
                    {product?.status !== "available" ? 0 : quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity + 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={
                      product?.status !== "available" ||
                      insertCartMutation.isPending
                    }
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {isProductLoading ? (
                    <div className="bg-gray-200 w-16 h-4 rounded-lg skeleton-effect ">
                      <Skeleton width={80} />
                    </div>
                  ) : (
                    <span>{capitalizeFirstLetter(product?.status)}</span>
                  )}
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700"
                  disabled={
                    product?.status !== "available" ||
                    insertCartMutation.isPending
                  }
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  {insertCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </Button>
              </div>
              <Link
                to="/user/order/review"
                state={{
                  items: product ? [{ product_id: product, quantity }] : [],
                  subtotal: (product?.price ?? 0) * quantity,
                  shippingFee: (product?.price ?? 0) * quantity > 500 ? 0 : 50,
                  total:
                    (product?.price ?? 0) * quantity +
                    ((product?.price ?? 0) * quantity > 500 ? 0 : 50),
                }}
                prefetch="viewport"
                className={`w-full ${product?.status !== "available" || insertCartMutation.isPending ? "pointer-events-none" : ""}`}
              >
                <Button
                  variant={"destructive"}
                  className="w-full"
                  disabled={
                    product?.status !== "available" ||
                    insertCartMutation.isPending
                  }
                >
                  Buy Now
                </Button>
              </Link>
            </div>

            {/* Benefits */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex gap-3">
                <Truck className="text-blue-600 shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">
                    On orders over ₱1200 and within Sto Tomas DDN
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Shield className="text-blue-600 shrink-0" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">
                    30% must be given as downpayment for secure transaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            {/* Description Tab */}
            <TabsContent value="description" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isProductLoading ? (
                    <div className="bg-gray-200 w-full h-24 rounded-lg skeleton-effect">
                      <Skeleton width="100%" height={96} />
                    </div>
                  ) : (
                    <p className="text-gray-700">{product?.description}</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              {/* Existing Reviews */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                {isProductLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-200 w-full h-20 rounded-lg skeleton-effect"
                    >
                      <Skeleton width="100%" height={80} />
                    </div>
                  ))
                ) : (
                  <span className="text-gray-600 text-center" />
                )}
                {product?.feedback.map((feedback: Feedback) => (
                  <Card key={feedback.id}>
                    <CardContent>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {capitalizeFirstLetter(feedback.user_id.first_name)}{" "}
                            {capitalizeFirstLetter(feedback.user_id.last_name)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(feedback.created_at)}
                          </p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < feedback.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{feedback.feedback}</p>
                    </CardContent>
                  </Card>
                ))}
                {!isProductLoading && product?.feedback.length === 0 && (
                  <p className="text-gray-600 text-center">
                    No reviews yet. Be the first to review this product!
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {isProductLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 w-full h-80 rounded-lg skeleton-effect"
                  >
                    <Skeleton width="100%" height={80} />
                  </div>
                ))
              : product?.related_products?.map(
                  (item: Product, index: number) => (
                    <Link
                      key={index}
                      to={`/user/products/${item?.id}`}
                      prefetch="viewport"
                      onClick={() => setImgLoaded(false)}
                    >
                      <Card
                        key={item.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <div className="aspect-square overflow-hidden flex items-center justify-center">
                          {!imgLoaded && (
                            <OrbitProgress
                              variant="spokes"
                              dense
                              color="#b2b2b2"
                              size="medium"
                            />
                          )}

                          <img
                            src={item.image_url}
                            alt="Related product"
                            className={`h-full w-full object-cover hover:scale-110 transition-transform ${imgLoaded ? "" : "hidden"}`}
                            onLoad={() => setImgLoaded(true)}
                          />
                        </div>
                        <CardContent className="pt-4">
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold text-gray-900">
                              ₱{item.price}
                            </span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={
                                    i <
                                    Math.floor(
                                      averageRating(
                                        item?.feedback?.map(
                                          (f: any) => f.rating,
                                        ) || [],
                                      ),
                                    )
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ),
                )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
