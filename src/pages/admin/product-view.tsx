/* eslint-disable @typescript-eslint/no-explicit-any */
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
import CustomSkeleton from "@/components/custom/custom-skeleton";
import { useAdminProductView } from "@/hooks/use-admin-product-view";
import { getStatusBadgeColor } from "@/utils/status";
import { averageRating, ratingDistribution } from "@/utils/rating";
import { formatDate } from "@/utils/date";

export default function ProductView() {
  const { id: productId } = useParams();
  const { data: product } = useProductID(Number(productId));
  const breadCrumb = useViewProductBreadCrumb();
  const { imgLoaded, setImgLoaded } = useAdminProductView();

  return (
    <AdminLayout breadCrumbs={breadCrumb}>
      <div className="grid grid-cols-5 gap-5 p-5">
        <div className="col-span-2">
          <div className="relative aspect-square mb-4 bg-muted rounded-md overflow-hidden flex items-center justify-center ">
            {!imgLoaded && <CustomSkeleton type="photo-full" />}
            <img
              src={product?.image_url}
              width={400}
              height={400}
              className={`h-full w-full object-cover ${imgLoaded ? "" : "hidden"}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </div>
        <div className="col-span-3 space-y-5">
          {/* Product Header */}
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="secondary" className="mb-2 p-2 px-5">
                  {capitalizeFirstLetter(product?.category.name)}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground">
                  {capitalizeFirstLetter(product?.name) || (
                    <Skeleton width={200} />
                  )}
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
                  className={`px-5 py-2 rounded-full text-xs font-semibold ${getStatusBadgeColor(product?.status)}`}
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
                      size={16}
                      className={
                        i <
                        Math.floor(
                          averageRating(
                            product?.feedback?.map((f: any) => f.rating) || [],
                          ),
                        )
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="font-semibold">
                  {averageRating(
                    product?.feedback?.map((f: any) => f.rating) || [],
                  )}
                </span>
              </div>
              <span className="text-muted-foreground">
                ({product?.feedback?.length}{" "}
                {product?.feedback?.length > 1 ? "Reviews" : "Review"})
              </span>
            </div>

            <p className="text-muted-foreground mt-4">{product?.description}</p>
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
                    {product?.code}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-3">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold text-foreground">
                    {product?.category.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-border pt-3">
                  <span className="text-muted-foreground">Created Date</span>
                  <span className="font-semibold text-foreground">
                    {formatDate(product?.created_at)}
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
                      {ratingDistribution(product?.feedback || [])[stars] || 0}
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
