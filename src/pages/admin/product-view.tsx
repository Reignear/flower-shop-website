import { Star } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AdminLayout from "@/components/layout/admin-layout";
import { useViewProductBreadCrumb } from "@/data/admin-layout-data";
import { useParams } from "react-router-dom";
import { useProductID } from "@/tanstack/fetch.hook";
import { capitalizeFirstLetter } from "@/utils/capitalize";
import type { ProductFeedback } from "@/utils/interface";

// Sample product data
const productData = {
  id: 11,
  code: "KC-002",
  name: "Strawberry Keychain",
  description:
    "This is a strawberry key chain with vibrant colors and soft material. Perfect for adding a touch of fun to your keys.",
  price: 69,
  category: "Key Chains",
  rating: 4.5,
  totalReviews: 128,
  inStock: true,
  createdAt: "2026-02-03",
  images: [
    "/images/image.png",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
  ],
  stats: {
    totalSales: 1240,
    totalViews: 8932,
    conversionRate: "13.8%",
    avgRating: 4.5,
  },
  reviews: [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      text: "Absolutely love this keychain! The quality is amazing and it looks even better in person.",
      date: "2026-01-28",
    },
    {
      id: 2,
      author: "Mike Chen",
      rating: 4,
      text: "Great product, arrived quickly. Slight color variation from the photo but still very happy.",
      date: "2026-01-25",
    },
    {
      id: 3,
      author: "Emma Davis",
      rating: 5,
      text: "Perfect gift! My sister loved it. Highly recommend!",
      date: "2026-01-20",
    },
  ],
  ratingDistribution: {
    5: 95,
    4: 22,
    3: 8,
    2: 2,
    1: 1,
  },
};

export default function ProductView() {
  const { id: productId } = useParams();
  const { data: product } = useProductID(Number(productId));
  console.log(product);
  const breadCrumb = useViewProductBreadCrumb();

  return (
    <AdminLayout breadCrumbs={breadCrumb}>
      <div className="grid grid-cols-5 gap-5 p-5">
        <div className="col-span-2">
          <div className="relative aspect-square mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center ">
            <img
              src={product?.image_url}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="col-span-3 space-y-5">
          {/* Product Header */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="secondary" className="mb-2 p-2 px-5">
                  {product?.category_id}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground">
                  {product?.name || <Skeleton width={200} />}
                </h1>
                <p className="text-muted-foreground mt-1">
                  Code: {product?.code}
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  ₱{product?.price}
                </div>
                <span
                  className={`px-5 py-2 rounded-full text-xs font-semibold ${
                    product?.status === "available"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-chart-5/20 text-chart-5"
                  }`}
                >
                  {capitalizeFirstLetter(product?.status)}
                </span>
              </div>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center gap-4 py-4 border-t border-border pt-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{productData.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({productData.totalReviews} reviews)
              </span>
            </div>

            <p className="text-muted-foreground mt-4">{product?.description}</p>
          </div>

          {/* Analytics Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {productData.stats.totalSales}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Sales
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {productData.stats.totalViews}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Views
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {productData.stats.conversionRate}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Conversion Rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {productData.stats.avgRating}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Avg Rating</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product Code</span>
                  <span className="font-semibold text-foreground">
                    {productData.code}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-3">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold text-foreground">
                    {productData.category}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-3">
                  <span className="text-muted-foreground">Created Date</span>
                  <span className="font-semibold text-foreground">
                    {productData.createdAt}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Rating Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex gap-0.5 w-20">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < stars
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full transition-all" />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {
                        productData.ratingDistribution[
                          stars as keyof typeof productData.ratingDistribution
                        ]
                      }
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>
                Customer feedback and testimonials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {product?.feedback.map((fd: ProductFeedback) => (
                <div
                  key={fd.id}
                  className="border-t border-border pt-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {capitalizeFirstLetter(fd.user.first_name)}{" "}
                        {capitalizeFirstLetter(fd.user.middle_name)}{" "}
                        {capitalizeFirstLetter(fd.user.last_name)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {fd.created_at}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < fd.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {fd?.feedback}
                  </p>
                </div>
              ))}
              {product?.feedback?.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  No reviews yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
